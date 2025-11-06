# Google Maps Integration Setup

## Overview

BrightPath includes Google Maps integration for tracking children's exact locations. This allows field workers to:
- View child locations on an interactive map
- Select exact GPS coordinates when registering children
- Track location history
- Get directions to child locations
- Search for locations

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key (recommended):
   - Application restrictions: HTTP referrers
   - Add your domain (e.g., `https://your-app.netlify.app/*`)
   - API restrictions: Select only the APIs you enabled

### 2. Add API Key to Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**For Netlify Deployment:**

1. Go to Netlify Dashboard
2. Navigate to Site Settings → Environment Variables
3. Add:
   - Key: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: Your Google Maps API key

### 3. Features Enabled

#### Location Tracking (`/children/:id/location`)
- View child's current location on map
- See location history
- Get directions
- Refresh location using GPS

#### Location Editor (`/children/:id/location/edit`)
- Update child's location
- Click on map to set coordinates
- Search for addresses
- Use current GPS location

#### Register Child with Map
- Select exact coordinates when registering
- Search for addresses
- Visual location selection

## Usage

### For Field Workers

1. **When Registering a Child:**
   - Fill in region, district, community
   - Click "Select on Map" button
   - Click on map or search for address
   - Coordinates are automatically saved

2. **Viewing Child Location:**
   - Go to Child Details page
   - Click "Track Location" button
   - View on interactive map
   - See location history

3. **Updating Location:**
   - Go to Location Tracker
   - Click "Update Location"
   - Select new location on map
   - Save changes

### API Key Security

- **Never commit** your API key to version control
- Use environment variables
- Restrict API key in Google Cloud Console
- Monitor API usage in Google Cloud Console
- Set up billing alerts

## Cost Considerations

Google Maps API has a free tier:
- $200 free credit per month
- Maps JavaScript API: Free for most use cases
- Places API: $17 per 1000 requests
- Geocoding API: $5 per 1000 requests

For a typical deployment:
- ~1000 children tracked
- ~100 location updates per day
- Estimated cost: $0-50/month (well within free tier)

## Troubleshooting

### Map Not Loading
- Check if API key is set in environment variables
- Verify API key is not restricted incorrectly
- Check browser console for errors
- Ensure Maps JavaScript API is enabled

### Location Search Not Working
- Verify Places API is enabled
- Check API key restrictions
- Ensure billing is enabled (required for Places API)

### GPS Location Not Working
- Check browser permissions for location access
- Ensure HTTPS (required for geolocation)
- Test on actual device (not all browsers support geolocation)

## Alternative: OpenStreetMap (Free)

If you prefer a free alternative, you can use:
- Leaflet.js with OpenStreetMap
- No API key required
- Completely free
- Good for basic mapping needs

## Support

For issues with Google Maps integration, check:
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Google Cloud Console](https://console.cloud.google.com/)
- API status: [Google Cloud Status](https://status.cloud.google.com/)

