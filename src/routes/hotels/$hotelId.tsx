import { ImageGallery } from '@/components/ImageGallery/ImageGallery';
import hotelsData from '@/.mock_data/hotels.json';

export const Route = createFileRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { hotelId } = Route.useParams();

  const hotel = hotelsData.find((hotel) => hotel.id === hotelId);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const images: string[] = [];
  if (hotel.image_details && hotel.hires_image_index) {
    const { prefix, suffix } = hotel.image_details;
    const indices = hotel.hires_image_index
      .split(',')
      .map((i) => i.trim())
      .slice(0, 5);

    for (const idx of indices) {
      images.push(`${prefix}${idx}${suffix}`);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <ImageGallery images={images} />
    </div>
  );
}
