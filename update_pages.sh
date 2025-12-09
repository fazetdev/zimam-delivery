#!/bin/bash
# Update container classes in all pages
for file in src/pages/*.tsx; do
  if [ -f "$file" ]; then
    # Replace max-w-md with more responsive classes
    sed -i 's/max-w-md mx-auto min-h-screen bg-white/w-full min-h-screen bg-white md:max-w-md md:mx-auto/' "$file"
    sed -i 's/max-w-md mx-auto min-h-screen bg-white relative/w-full min-h-screen bg-white md:max-w-md md:mx-auto relative/' "$file"
    sed -i 's/max-w-md mx-auto min-h-screen bg-white shadow-lg relative/w-full min-h-screen bg-white md:max-w-md md:mx-auto shadow-lg relative/' "$file"
  fi
done

# Update Header component
sed -i 's/max-w-md mx-auto/w-full md:max-w-md md:mx-auto/' components/Header.tsx

# Update BottomNav component  
sed -i 's/max-w-md mx-auto/w-full md:max-w-md md:mx-auto/' components/BottomNav.tsx
