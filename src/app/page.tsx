import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PopularSearches from "@/components/home/PopularSearches";
import Statistics from "@/components/home/Statistics";
import Categories from "@/components/home/Categories";
import FeaturedBusinesses from "@/components/home/FeaturedBusinesses";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";
import PopularCities from "@/components/home/PopularCities";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PopularSearches />
        <Statistics />
        <Categories />
        <PopularCities />
        <FeaturedBusinesses />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

