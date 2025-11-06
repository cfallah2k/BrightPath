/// <reference types="@types/google.maps" />

declare global {
  interface Window {
    google: typeof google
  }
  
  namespace google {
    namespace maps {
      class Map {
        constructor(element: HTMLElement | null, options?: MapOptions)
        setCenter(latlng: LatLng | LatLngLiteral): void
        setZoom(zoom: number): void
        addListener(eventName: string, handler: Function): MapsEventListener
      }
      
      class Marker {
        constructor(options?: MarkerOptions)
        setPosition(latlng: LatLng | LatLngLiteral | null): void
        getPosition(): LatLng | null
        addListener(eventName: string, handler: Function): MapsEventListener
      }
      
      class Geocoder {
        geocode(request: GeocoderRequest, callback: (results: GeocoderResult[] | null, status: GeocoderStatus) => void): void
      }
      
      namespace places {
        class Autocomplete {
          constructor(inputField: HTMLInputElement, options?: AutocompleteOptions)
          getPlace(): PlaceResult
          addListener(eventName: string, handler: Function): void
        }
      }
      
      interface MapOptions {
        center?: LatLng | LatLngLiteral
        zoom?: number
        mapTypeControl?: boolean
        streetViewControl?: boolean
        fullscreenControl?: boolean
        zoomControl?: boolean
        styles?: MapTypeStyle[]
      }
      
      interface MarkerOptions {
        position?: LatLng | LatLngLiteral
        map?: Map | null
        title?: string
        draggable?: boolean
        icon?: string | Icon | Symbol
      }
      
      interface GeocoderRequest {
        location?: LatLng | LatLngLiteral
        address?: string
      }
      
      interface GeocoderResult {
        formatted_address: string
        geometry: GeocoderGeometry
      }
      
      interface GeocoderGeometry {
        location: LatLng
      }
      
      interface LatLng {
        lat(): number
        lng(): number
      }
      
      interface LatLngLiteral {
        lat: number
        lng: number
      }
      
      interface MapMouseEvent {
        latLng: LatLng | null
      }
      
      interface MapsEventListener {
        remove(): void
      }
      
      interface PlaceResult {
        formatted_address?: string
        geometry?: {
          location?: LatLng
        }
      }
      
      interface AutocompleteOptions {
        types?: string[]
        componentRestrictions?: ComponentRestrictions
      }
      
      interface ComponentRestrictions {
        country?: string | string[]
      }
      
      interface MapTypeStyle {
        featureType?: string
        elementType?: string
        stylers?: Array<{ [key: string]: any }>
      }
      
      interface Icon {
        url?: string
        scaledSize?: Size
      }
      
      interface Symbol {
        path?: string
      }
      
      interface Size {
        width: number
        height: number
      }
      
      enum GeocoderStatus {
        OK = 'OK',
        ERROR = 'ERROR'
      }
    }
  }
}

export {}

