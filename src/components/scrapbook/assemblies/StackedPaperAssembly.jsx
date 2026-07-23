import {
  Children,
  isValidElement,
} from "react"

import {
  getAssemblyLayoutRecipe,
  hasAssemblyLayoutRecipe,
} from "../../../scrapbook/assemblies/assemblyLayoutRegistry"

import {
  defaultAssemblyLayer,
  defaultAttachmentPosition,
} from "../../../scrapbook/assemblies/assemblyRecipeDefaults"

import {
  ScrapbookAsset,
} from "../../../scrapbook/components/ScrapbookAsset"

import {
  resolveScrapbookMaterialRole,
} from "../../../scrapbook/materials/assetRegistry"

import "./StackedPaperAssembly.css"

const assemblyPaperclip =
  resolveScrapbookMaterialRole(
    "metal",
    "paperclip",
    "metal-paperclip-antique-gold-01"
  )

const assemblyBinderClip =
  resolveScrapbookMaterialRole(
    "metal",
    "binderClip",
    "metal-binder-clip-antique-brass-01"
  )

function normalizeNumber(
  value,
  fallback = 0
) {
  return Number.isFinite(
    Number(value)
  )
    ? Number(value)
    : fallback
}

function getLayerDefinition(
  recipe,
  index
) {
  const layers =
    Array.isArray(
      recipe?.repeatLayers
    )
      ? recipe.repeatLayers
      : []

  const defaultLayer = {
    ...defaultAssemblyLayer,
    ...(recipe?.defaultLayer ||
      {}),
    z: index + 1,
  }

  if (!layers.length) {
    return defaultLayer
  }

  const repeatedLayer =
    layers[
      index % layers.length
    ]

  const cycleIndex =
    Math.floor(
      index / layers.length
    )

  const cycleOffset =
    recipe?.cycleOffset || {}

  return {
    ...defaultLayer,
    ...repeatedLayer,

    x:
      normalizeNumber(
        repeatedLayer?.x,
        defaultLayer.x
      ) +
      normalizeNumber(
        cycleOffset.x
      ) *
        cycleIndex,

    y:
      normalizeNumber(
        repeatedLayer?.y,
        defaultLayer.y
      ) +
      normalizeNumber(
        cycleOffset.y
      ) *
        cycleIndex,

    rotation:
      normalizeNumber(
        repeatedLayer?.rotation,
        defaultLayer.rotation
      ) +
      normalizeNumber(
        cycleOffset.rotation
      ) *
        cycleIndex,

    z:
      normalizeNumber(
        repeatedLayer?.z,
        index + 1
      ) +
      normalizeNumber(
        cycleOffset.z
      ) *
        cycleIndex,
  }
}

function StackedPaperAssembly({
  children,
  recipe = "",
  clip,
  className = "",
}) {
  const recipeExists =
    hasAssemblyLayoutRecipe(
      recipe
    )

  const resolvedRecipe =
    getAssemblyLayoutRecipe(
      recipe
    )

  const items = Children.toArray(
    children
  ).filter(isValidElement)

  if (!items.length) {
    return null
  }

  const resolvedClip =
    clip ??
    resolvedRecipe?.attachment ??
    "none"

  const direction =
    resolvedRecipe?.direction ||
    "vertical"

  const align =
    resolvedRecipe?.align ||
    "center"

  const paddingTop =
    resolvedRecipe?.paddingTop ||
    "0"

  const recipeClassName =
    resolvedRecipe?.className ||
    ""

  const attachmentPosition = {
    ...defaultAttachmentPosition,
    ...(resolvedRecipe
      ?.attachmentPosition ||
      {}),
  }

  return (
    <div
      className={[
        "stacked-paper-assembly",
        `stacked-paper-assembly--${direction}`,
        `stacked-paper-assembly--align-${align}`,
        recipeExists && recipe
          ? `stacked-paper-assembly--${recipe}`
          : "",
        recipeClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-assembly-recipe={
        recipeExists
          ? recipe
          : "defaultStack"
      }
      style={{
        "--assembly-padding-top":
          paddingTop,

        "--assembly-attachment-top":
          typeof attachmentPosition.top ===
          "number"
            ? `${attachmentPosition.top}px`
            : attachmentPosition.top,

        "--assembly-attachment-left":
          typeof attachmentPosition.left ===
          "number"
            ? `${attachmentPosition.left}px`
            : attachmentPosition.left,

        "--assembly-attachment-x":
          typeof attachmentPosition.x ===
          "number"
            ? `${attachmentPosition.x}px`
            : attachmentPosition.x,

        "--assembly-attachment-y":
          typeof attachmentPosition.y ===
          "number"
            ? `${attachmentPosition.y}px`
            : attachmentPosition.y,

        "--assembly-attachment-rotation":
          `${normalizeNumber(
            attachmentPosition.rotation
          )}deg`,

        "--assembly-attachment-z":
          normalizeNumber(
            attachmentPosition.z,
            100
          ),
      }}
    >
 {resolvedClip === "paperclip" ? (
  <ScrapbookAsset
    asset={assemblyPaperclip}
    className={[
      "stacked-paper-assembly__clip",
      "stacked-paper-assembly__clip-asset--paperclip",
    ].join(" ")}
    placement={{
      width:
        "clamp(44px, 6vw, 54px)",
      shadow:
        "1px 3px 4px rgba(54, 43, 32, 0.16)",
    }}
  />
) : resolvedClip === "binder" ? (
  <ScrapbookAsset
    asset={assemblyBinderClip}
    className={[
      "stacked-paper-assembly__clip",
      "stacked-paper-assembly__clip-asset--binder",
    ].join(" ")}
    placement={{
      width:
        "clamp(50px, 7vw, 62px)",
      shadow:
        "1px 4px 5px rgba(54, 43, 32, 0.18)",
    }}
  />
) : resolvedClip !== "none" ? (
  <span
    className={[
      "stacked-paper-assembly__clip",
      `stacked-paper-assembly__clip--${resolvedClip}`,
    ].join(" ")}
    aria-hidden="true"
  />
) : null}

      {items.map(
        (child, index) => {
          const layer =
            getLayerDefinition(
              resolvedRecipe,
              index
            )

          const x =
            normalizeNumber(
              layer.x
            )

          const y =
            normalizeNumber(
              layer.y
            )

          const rotation =
            normalizeNumber(
              layer.rotation
            )

          const z =
            normalizeNumber(
              layer.z,
              index + 1
            )

          return (
            <div
              key={
                child.key ??
                `assembly-layer-${index}`
              }
              className="stacked-paper-assembly__layer"
              style={{
                "--assembly-layer-x": `${x}px`,
                "--assembly-layer-y": `${y}px`,
                "--assembly-layer-rotation": `${rotation}deg`,
                "--assembly-layer-z": z,
              }}
            >
              {child}
            </div>
          )
        }
      )}
    </div>
  )
}

export default StackedPaperAssembly