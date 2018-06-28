#!/bin/bash
filename=".env"
echo "Exporting ...";
while IFS= read -r line; do
  echo $line;
  export $line;
done < "$filename"
echo "Done."
