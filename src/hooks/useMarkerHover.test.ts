import { renderHook } from '@/tests/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMarkerHover } from './useMarkerHover';

// Mock the CSS module
vi.mock('@/features/SearchPage/HotelMap/PriceTag/PriceTag.module.css', () => ({
  default: {
    priceTag: 'priceTag',
    priceTagHovered: 'priceTagHovered',
    priceTagActive: 'priceTagActive',
    onTop: 'onTop',
  },
}));

describe('useMarkerHover', () => {
  // Mock DOM elements and Leaflet marker
  let mockElement: HTMLElement;
  let mockChildElement: HTMLElement;
  let mockMarker: L.Marker;
  let mockGetElement: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Create mock child element (price tag)
    mockChildElement = document.createElement('div');
    mockChildElement.className = 'priceTag';

    // Create mock parent element
    mockElement = document.createElement('div');
    mockElement.appendChild(mockChildElement);

    // Mock Leaflet marker
    mockGetElement = vi.fn(() => mockElement);
    mockMarker = {
      getElement: mockGetElement,
    } as unknown as L.Marker;

    // Clear all class lists
    mockElement.className = '';
    mockChildElement.className = 'priceTag';
  });

  describe('makeMarkerRef', () => {
    it('should store marker reference when marker is provided', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      markerRef(mockMarker);

      // Test that the marker is stored by trying to use it
      result.current.handleMouseEnter('marker1');
      expect(mockGetElement).toHaveBeenCalled();
    });

    it('should remove marker reference when null is provided', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      // First store the marker
      markerRef(mockMarker);

      // Then remove it
      markerRef(null);

      // Test that the marker is no longer stored
      result.current.handleMouseEnter('marker1');
      expect(mockGetElement).not.toHaveBeenCalled();
    });

    it('should handle multiple markers with different IDs', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef1 = result.current.makeMarkerRef('marker1');
      const markerRef2 = result.current.makeMarkerRef('marker2');

      const mockGetElement2 = vi.fn(() => mockElement);
      const mockMarker2 = {
        getElement: mockGetElement2,
      } as unknown as L.Marker;

      markerRef1(mockMarker);
      markerRef2(mockMarker2);

      // Test that both markers are stored independently
      result.current.handleMouseEnter('marker1');
      expect(mockGetElement).toHaveBeenCalled();

      result.current.handleMouseEnter('marker2');
      expect(mockGetElement2).toHaveBeenCalled();
    });
  });

  describe('handleMouseEnter', () => {
    it('should add hover classes when marker exists', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      result.current.handleMouseEnter('marker1');

      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(true);
    });

    it('should not throw error when marker does not exist', () => {
      const { result } = renderHook(() => useMarkerHover());

      expect(() => {
        result.current.handleMouseEnter('nonexistent');
      }).not.toThrow();
    });

    it('should not throw error when element is null', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      const mockGetElementNull = vi.fn(() => null);
      const mockMarkerWithNullElement = {
        getElement: mockGetElementNull,
      } as unknown as L.Marker;

      markerRef(mockMarkerWithNullElement);

      expect(() => {
        result.current.handleMouseEnter('marker1');
      }).not.toThrow();
    });

    it('should not throw error when child element is not found', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      // Remove child element
      mockElement.removeChild(mockChildElement);
      markerRef(mockMarker);

      expect(() => {
        result.current.handleMouseEnter('marker1');
      }).not.toThrow();

      expect(mockElement.classList.contains('onTop')).toBe(true);
    });
  });

  describe('handleMouseLeave', () => {
    it('should remove hover classes when marker exists', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      // First add the classes
      result.current.handleMouseEnter('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(true);

      // Then remove them
      result.current.handleMouseLeave('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(false);
    });

    it('should not throw error when marker does not exist', () => {
      const { result } = renderHook(() => useMarkerHover());

      expect(() => {
        result.current.handleMouseLeave('nonexistent');
      }).not.toThrow();
    });

    it('should not throw error when element is null', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      const mockGetElementNull = vi.fn(() => null);
      const mockMarkerWithNullElement = {
        getElement: mockGetElementNull,
      } as unknown as L.Marker;

      markerRef(mockMarkerWithNullElement);

      expect(() => {
        result.current.handleMouseLeave('marker1');
      }).not.toThrow();
    });
  });

  describe('handlePopupOpen', () => {
    it('should add active classes when marker exists', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      result.current.handlePopupOpen('marker1');

      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(true);
    });

    it('should not throw error when marker does not exist', () => {
      const { result } = renderHook(() => useMarkerHover());

      expect(() => {
        result.current.handlePopupOpen('nonexistent');
      }).not.toThrow();
    });

    it('should not throw error when element is null', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      const mockGetElementNull = vi.fn(() => null);
      const mockMarkerWithNullElement = {
        getElement: mockGetElementNull,
      } as unknown as L.Marker;

      markerRef(mockMarkerWithNullElement);

      expect(() => {
        result.current.handlePopupOpen('marker1');
      }).not.toThrow();
    });
  });

  describe('handlePopupClose', () => {
    it('should remove active classes when marker exists', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      // First add the classes
      result.current.handlePopupOpen('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(true);

      // Then remove them
      result.current.handlePopupClose('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(false);
    });

    it('should not throw error when marker does not exist', () => {
      const { result } = renderHook(() => useMarkerHover());

      expect(() => {
        result.current.handlePopupClose('nonexistent');
      }).not.toThrow();
    });

    it('should not throw error when element is null', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');

      const mockGetElementNull = vi.fn(() => null);
      const mockMarkerWithNullElement = {
        getElement: mockGetElementNull,
      } as unknown as L.Marker;

      markerRef(mockMarkerWithNullElement);

      expect(() => {
        result.current.handlePopupClose('marker1');
      }).not.toThrow();
    });
  });

  describe('integration tests', () => {
    it('should handle complete hover interaction flow', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      // Mouse enter
      result.current.handleMouseEnter('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(true);

      // Mouse leave
      result.current.handleMouseLeave('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(false);
    });

    it('should handle complete popup interaction flow', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      // Popup open
      result.current.handlePopupOpen('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(true);

      // Popup close
      result.current.handlePopupClose('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(false);
    });

    it('should handle overlapping hover and popup states', () => {
      const { result } = renderHook(() => useMarkerHover());
      const markerRef = result.current.makeMarkerRef('marker1');
      markerRef(mockMarker);

      // Start with hover
      result.current.handleMouseEnter('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(true);

      // Open popup (should add active class and keep onTop)
      result.current.handlePopupOpen('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(true);

      // Mouse leave (should keep onTop due to popup, remove hover)
      result.current.handleMouseLeave('marker1');
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(true);

      // Close popup
      result.current.handlePopupClose('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockChildElement.classList.contains('priceTagActive')).toBe(false);
    });

    it('should handle multiple markers independently', () => {
      const { result } = renderHook(() => useMarkerHover());

      // Setup second marker
      const mockElement2 = document.createElement('div');
      const mockChildElement2 = document.createElement('div');
      mockChildElement2.className = 'priceTag';
      mockElement2.appendChild(mockChildElement2);

      const mockGetElement2 = vi.fn(() => mockElement2);
      const mockMarker2 = {
        getElement: mockGetElement2,
      } as unknown as L.Marker;

      const markerRef1 = result.current.makeMarkerRef('marker1');
      const markerRef2 = result.current.makeMarkerRef('marker2');

      markerRef1(mockMarker);
      markerRef2(mockMarker2);

      // Hover first marker
      result.current.handleMouseEnter('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockElement2.classList.contains('onTop')).toBe(false);

      // Open popup on second marker
      result.current.handlePopupOpen('marker2');
      expect(mockElement.classList.contains('onTop')).toBe(true);
      expect(mockElement2.classList.contains('onTop')).toBe(true);
      expect(mockChildElement.classList.contains('priceTagHovered')).toBe(true);
      expect(mockChildElement2.classList.contains('priceTagActive')).toBe(true);

      // Clean up first marker
      result.current.handleMouseLeave('marker1');
      expect(mockElement.classList.contains('onTop')).toBe(false);
      expect(mockElement2.classList.contains('onTop')).toBe(true);
    });
  });

  describe('hook stability', () => {
    it('should return stable function references', () => {
      const { result, rerender } = renderHook(() => useMarkerHover());

      const firstRender = result.current;
      rerender();
      const secondRender = result.current;

      expect(firstRender.makeMarkerRef).toBe(secondRender.makeMarkerRef);
      expect(firstRender.handleMouseEnter).toBe(secondRender.handleMouseEnter);
      expect(firstRender.handleMouseLeave).toBe(secondRender.handleMouseLeave);
      expect(firstRender.handlePopupOpen).toBe(secondRender.handlePopupOpen);
      expect(firstRender.handlePopupClose).toBe(secondRender.handlePopupClose);
    });
  });
});
