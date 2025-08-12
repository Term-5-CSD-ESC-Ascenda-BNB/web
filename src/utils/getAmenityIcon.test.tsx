import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getAmenityIcon } from './getAmenityIcon';

describe('getAmenityIcon', () => {
  // Helper function to get the icon name from the rendered component
  const getIconName = (label: string): string => {
    const { container } = render(getAmenityIcon(label));
    const svg = container.querySelector('svg');
    return svg?.getAttribute('class') || '';
  };

  describe('air conditioning', () => {
    it('returns wind icon for air-related amenities', () => {
      expect(getIconName('Air conditioning')).toContain('tabler-icon-wind');
      expect(getIconName('air con')).toContain('tabler-icon-wind');
      expect(getIconName('AIR FLOW')).toContain('tabler-icon-wind');
    });
  });

  describe('business amenities', () => {
    it('returns briefcase icon for business-related amenities', () => {
      expect(getIconName('Business center')).toContain('tabler-icon-briefcase');
      expect(getIconName('business lounge')).toContain('tabler-icon-briefcase');
    });
  });

  describe('ironing', () => {
    it('returns ironing icon for iron-related amenities', () => {
      expect(getIconName('Iron & ironing board')).toContain('tabler-icon-ironing-3');
      expect(getIconName('ironing facilities')).toContain('tabler-icon-ironing-3');
    });
  });

  describe('data/ports', () => {
    it('returns plug icon for data and port amenities', () => {
      expect(getIconName('Data port')).toContain('tabler-icon-plug-connected');
      expect(getIconName('ethernet port')).toContain('tabler-icon-plug-connected');
      expect(getIconName('data connection')).toContain('tabler-icon-plug-connected');
    });
  });

  describe('dry cleaning', () => {
    it('returns shirt icon for dry cleaning amenities', () => {
      expect(getIconName('Dry cleaning')).toContain('tabler-icon-shirt');
      expect(getIconName('dry clean service')).toContain('tabler-icon-shirt');
    });
  });

  describe('hair services', () => {
    it('returns scissors icon for hair-related amenities', () => {
      expect(getIconName('Hair dryer')).toContain('tabler-icon-scissors');
      expect(getIconName('hair salon')).toContain('tabler-icon-scissors');
    });
  });

  describe('meeting facilities', () => {
    it('returns users group icon for meeting amenities', () => {
      expect(getIconName('Meeting room')).toContain('tabler-icon-users-group');
      expect(getIconName('meeting facilities')).toContain('tabler-icon-users-group');
    });
  });

  describe('pool', () => {
    it('returns swimming icon for pool amenities', () => {
      expect(getIconName('Swimming pool')).toContain('tabler-icon-swimming');
      expect(getIconName('outdoor pool')).toContain('tabler-icon-swimming');
    });
  });

  describe('parking', () => {
    it('returns parking icon for parking and garage amenities', () => {
      expect(getIconName('Parking')).toContain('tabler-icon-parking');
      expect(getIconName('Garage')).toContain('tabler-icon-parking');
      expect(getIconName('valet parking')).toContain('tabler-icon-parking');
    });
  });

  describe('room service', () => {
    it('returns bell icon for room service', () => {
      expect(getIconName('Room service')).toContain('tabler-icon-bell');
      expect(getIconName('24hr room service')).toContain('tabler-icon-bell');
    });
  });

  describe('safe', () => {
    it('returns scale icon for safe amenities', () => {
      expect(getIconName('Safe')).toContain('tabler-icon-scale');
      expect(getIconName('in-room safe')).toContain('tabler-icon-scale');
    });
  });

  describe('TV', () => {
    it('returns device TV icon for TV amenities', () => {
      expect(getIconName('TV')).toContain('tabler-icon-device-tv');
      expect(getIconName('Cable TV')).toContain('tabler-icon-device-tv');
      expect(getIconName('T V')).toContain('tabler-icon-device-tv'); // tests normalization
    });
  });

  describe('phone', () => {
    it('returns phone icon for phone and voicemail amenities', () => {
      expect(getIconName('Phone')).toContain('tabler-icon-phone');
      expect(getIconName('Voicemail')).toContain('tabler-icon-phone');
      expect(getIconName('voice mail')).toContain('tabler-icon-phone'); // tests normalization
      expect(getIconName('telephone')).toContain('tabler-icon-phone');
    });
  });

  describe('workspace', () => {
    it('returns writing icon for desk and workspace amenities', () => {
      expect(getIconName('Desk')).toContain('tabler-icon-writing');
      expect(getIconName('Work space')).toContain('tabler-icon-writing');
      expect(getIconName('workspace area')).toContain('tabler-icon-writing');
    });
  });

  describe('beverages', () => {
    it('returns coffee icon for coffee, tea, and drink amenities', () => {
      expect(getIconName('Coffee maker')).toContain('tabler-icon-coffee');
      expect(getIconName('Tea facilities')).toContain('tabler-icon-coffee');
      expect(getIconName('Minibar')).toContain('tabler-icon-coffee');
      expect(getIconName('Electric kettle')).toContain('tabler-icon-coffee');
    });
  });

  describe('breakfast', () => {
    it('returns bread icon for breakfast amenities', () => {
      expect(getIconName('Breakfast included')).toContain('tabler-icon-bread');
      expect(getIconName('continental breakfast')).toContain('tabler-icon-bread');
    });
  });

  describe('kitchen', () => {
    it('returns kitchen tools icon for kitchen amenities', () => {
      expect(getIconName('Kitchen')).toContain('tabler-icon-tools-kitchen-2');
      expect(getIconName('kitchenette')).toContain('tabler-icon-tools-kitchen-2');
    });
  });

  describe('bedding', () => {
    it('returns bed icon for bed and bedding amenities', () => {
      expect(getIconName('Extra bed')).toContain('tabler-icon-bed');
      expect(getIconName('Fresh bedding')).toContain('tabler-icon-bed');
      expect(getIconName('Linen service')).toContain('tabler-icon-bed');
    });
  });

  describe('towels', () => {
    it('returns trowel icon for towel amenities', () => {
      expect(getIconName('Towels')).toContain('tabler-icon-hanger-2');
      expect(getIconName('fresh towel')).toContain('tabler-icon-hanger-2');
    });
  });

  describe('baby amenities', () => {
    it('returns baby carriage icon for baby amenities', () => {
      expect(getIconName('Crib')).toContain('tabler-icon-baby-carriage');
      expect(getIconName('Infant bed')).toContain('tabler-icon-baby-carriage');
    });
  });

  describe('bath', () => {
    it('returns bath icon for bath amenities', () => {
      expect(getIconName('Bath tub')).toContain('tabler-icon-bath');
      expect(getIconName('Soaking tub')).toContain('tabler-icon-bath');
    });
  });

  describe('shower', () => {
    it('returns shoe icon for shower amenities', () => {
      expect(getIconName('Shower')).toContain('tabler-icon-shoe');
      expect(getIconName('walk-in shower')).toContain('tabler-icon-shoe');
    });
  });

  describe('fallback', () => {
    it('returns help circle icon for unknown amenities', () => {
      expect(getIconName('Unknown amenity')).toContain('tabler-icon-help-circle');
      expect(getIconName('Random facility')).toContain('tabler-icon-help-circle');
      expect(getIconName('')).toContain('tabler-icon-help-circle');
    });
  });

  describe('text normalization', () => {
    it('handles case insensitivity', () => {
      expect(getIconName('POOL')).toContain('tabler-icon-swimming');
      expect(getIconName('pool')).toContain('tabler-icon-swimming');
      expect(getIconName('Pool')).toContain('tabler-icon-swimming');
    });

    it('handles extra whitespace', () => {
      expect(getIconName('  swimming   pool  ')).toContain('tabler-icon-swimming');
      expect(getIconName('room  service')).toContain('tabler-icon-bell');
    });

    it('normalizes T V to tv', () => {
      expect(getIconName('T V')).toContain('tabler-icon-device-tv');
      expect(getIconName('T  V')).toContain('tabler-icon-device-tv');
    });

    it('normalizes voice mail variations', () => {
      expect(getIconName('voice mail')).toContain('tabler-icon-phone');
      expect(getIconName('voicemail')).toContain('tabler-icon-phone');
    });
  });

  describe('icon properties', () => {
    it('returns React elements with correct size prop', () => {
      const icon = getAmenityIcon('pool');
      const { container } = render(icon);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('width', '16');
      expect(svg).toHaveAttribute('height', '16');
    });

    it('returns valid React elements', () => {
      const icon = getAmenityIcon('any amenity');
      expect(icon).toBeDefined();
      expect(icon.type).toBeDefined();
      expect(icon.props).toBeDefined();
    });
  });
});
