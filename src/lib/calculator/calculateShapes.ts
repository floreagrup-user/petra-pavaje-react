// Pure geometry helpers for the "irregular surface" zone shapes. All inputs
// are in meters; all outputs are m². No React, no formatting -- see
// formatters.ts for display concerns.

export function rectangleArea(length: number, width: number): number {
  return length * width
}

export function squareArea(side: number): number {
  return side * side
}

export function triangleArea(base: number, height: number): number {
  return (base * height) / 2
}

export function circleArea(radius: number): number {
  return Math.PI * radius * radius
}

export function semicircleArea(radius: number): number {
  return (Math.PI * radius * radius) / 2
}
