import React from "react";
import { notFound } from "next/navigation";
import { cities } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CityPageClient from "./CityPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;

  // Find the city details
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CityPageClient city={city} />
      <Footer />
    </>
  );
}
