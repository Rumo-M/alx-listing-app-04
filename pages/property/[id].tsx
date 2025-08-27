// pages/property/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  // Add more fields from your API as needed
}

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; // Wait for id to be available

    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`
        );
        setProperty(response.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!property) return <p>No property found.</p>;

  return (
    <div className="p-6">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="text-green-700 font-semibold mt-2">${property.price}/night</p>
      <p className="mt-4">{property.description}</p>
    </div>
  );
}
