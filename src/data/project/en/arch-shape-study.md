---
title: Tracing a stone arch
summary: Turning a curve in a photograph into coordinates, competing models and comparable errors. An exploration across mathematical modelling, code and research writing.
locale: en
translationKey: arch-shape-study
category: Geometric modelling
status: Research notes
tags: [Mathematical modelling, Python, Research writing]
order: 1
draft: false
---

## Start with a visual question

Is a stone arch closer to a circular arc, a parabola or a catenary? Making a visual guess is easy; supporting it is harder. This short paper takes profile classification as its main thread, breaking an intuitive question into steps that can be computed, compared and challenged.

Three points help construct candidate curves, but do not establish a curve's type. The study therefore keeps multiple hypotheses and brings contour data into the comparison.

## Two preparations, one comparison

- **Data**: extract coordinates from marked photographic contours, documenting image scale, coordinate conversion and what each measurement means.
- **Models**: construct circular, parabolic and inverted catenary candidates using the two ends and the crown to describe their geometry.
- **Comparison**: fit all three models to the same traced points and compare them with the same error measure.

Photographic pixel traces and programmatically generated data are recorded separately. Simulation checks the method; it does not replace measurements of the actual object.

## Turn the method into code

The program processes contour marks, then searches candidate parameters on a coarse grid followed by a finer grid. It minimises squared residuals and compares root mean square errors. Units and image scales stay consistent so that incompatible measurements are not ranked together.

Known-answer checks examine the implementation, while noisy simulations explore whether candidates can be distinguished under the specified noise conditions. These checks address different questions; neither directly establishes the actual arch's curve type.

## Keep the conditions attached

In the manuscript's comparison of the available photographic traces, the catenary candidate has the lowest error, followed by the parabola. Perspective, occlusion, springing-point placement and manual tracing can all affect that ranking. The current evidence does not support a strong distinction between close candidates.

This remains an observation to revisit with more precise measurements. A smaller fitting error is not proof of the real contour's curve type.

## Explore beyond the main thread

Supplementary work compares step proportions and derives horizontal thrust under a simplified three-hinged arch model with specified loading assumptions. These are separate explorations connecting geometry with use and forces. They do not supply evidence for profile classification or constitute a safety assessment of an actual bridge.

## Leave the next question open

The next steps are scale calibration, repeated tracing and an estimate of tracing uncertainty, followed by checking whether model rankings remain stable. More precise measurements and additional viewpoints could clarify the limits of the current observation.

The work connects source material, mathematical modelling, Python experiments and the organisation of a paper's text and figures. AI tools assisted with tasks including source organisation, code and typesetting; assumptions, measurement definitions and the limits of the conclusions still require individual checks. Recording those judgments is part of the work.
