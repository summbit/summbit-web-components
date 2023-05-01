#!/bin/bash

projectsToMinify=(
  "js/summbit-dark-mode-switch.js"
  "js/summbit-discrete-slider.js"
)

for i in "${!projectsToMinify[@]}"
do
  printf "Minifying file '${projectsToMinify[${i}]}'\n"
  node "js/minify.mjs" "${projectsToMinify[${i}]}"
done
