import {
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers'
import type { WhitespacePosition } from '@vuepress/highlighter-helper'
import { resolveWhitespacePosition } from '@vuepress/highlighter-helper'
import type { ShikiTransformer } from 'shiki'
import type { ShikiHighlightOptions } from '../types.js'
import {
  addClassTransformer,
  cleanupTransformer,
  emptyLineTransformer,
  removeEscapeTransformer,
} from './vuepressTransformers.js'

export const getTransformers = (
  options: ShikiHighlightOptions,
): ShikiTransformer[] => {
  const transformers: ShikiTransformer[] = []

  if (options.notationDiff) {
    transformers.push(
      transformerNotationDiff({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationFocus) {
    transformers.push(
      transformerNotationFocus({
        classActiveLine: 'has-focus',
        classActivePre: 'has-focused-lines',
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationHighlight) {
    transformers.push(
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationErrorLevel) {
    transformers.push(
      transformerNotationErrorLevel({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationWordHighlight) {
    transformers.push(
      transformerNotationWordHighlight({
        matchAlgorithm: 'v3',
      }),
    )
    transformers.push(transformerMetaWordHighlight())
  }

  transformers.push(
    addClassTransformer,
    cleanupTransformer,
    removeEscapeTransformer,
    emptyLineTransformer,
  )

  return transformers
}

export const whitespaceTransformer = (
  meta: string,
  defaultPosition: WhitespacePosition | boolean = false,
): ShikiTransformer[] => {
  const position = resolveWhitespacePosition(meta, defaultPosition)
  // disable current code block
  if (position === false) return []

  return [transformerRenderWhitespace({ position })]
}
