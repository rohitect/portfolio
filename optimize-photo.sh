#!/bin/bash

# Optimize photo for resume/portfolio use
# Usage: ./optimize-photo.sh input.jpg [output.jpg]

if [ -z "$1" ]; then
    echo "Usage: ./optimize-photo.sh input.jpg [output.jpg]"
    echo "  input.jpg  - Source image file"
    echo "  output.jpg - Output file (optional, defaults to input-hq.jpg)"
    exit 1
fi

INPUT="$1"

if [ ! -f "$INPUT" ]; then
    echo "Error: File '$INPUT' not found"
    exit 1
fi

# Set output filename
if [ -z "$2" ]; then
    BASENAME="${INPUT%.*}"
    EXT="${INPUT##*.}"
    OUTPUT="${BASENAME}-hq.${EXT}"
else
    OUTPUT="$2"
fi

echo "Optimizing: $INPUT -> $OUTPUT"

# Generate high-quality version with 300 DPI
sips -s dpiWidth 300 -s dpiHeight 300 -s formatOptions 95 "$INPUT" --out "$OUTPUT"

echo ""
echo "Done! Output: $OUTPUT"
ls -lh "$OUTPUT"
