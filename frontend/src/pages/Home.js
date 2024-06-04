import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import Lottie from "lottie-react";
import animate from "../assest/animation/cake1.json";
import animattion from "../assest/animation/cake2.json";
import { Link } from "react-router-dom";
import fruitcake from "../assest/banner/new/fruit-cake.jpg"

const Home = () => {
  return (
    <div className='bg-orange-50 '>
      <CategoryList />
      <BannerProduct />
      <div className="flex justify-between p-8 items-center">
        <Lottie
          className="w-full max-w-sm rounded-full "
          animationData={animate}
        />
        <Link to={"/login"}>
          <p className="underline text-amber-600 text-center justify-center text-3xl font-bold">
            Login to explore <br />
            amazing offers
          </p>
        </Link>
        <Lottie
          className="w-full max-w-sm rounded-full "
          animationData={animattion}
        />
      </div>
      <div className='flex justify-center border-b pb-5'>
        <div className='flex-col mt-7 justify-center items-center'>
          <div className='flex justify-center items-center '> <span className='text-3xl text-amber-600 font-bold'>about us</span></div>
          <div className='flex justify-center items-center '><span className='text-6xl font-bold'>WELCOME TO CAKEZONE</span></div>
          <div className='flex mt-16 px-40'>
            <div className=''>
              <img src={fruitcake} alt='fruitcake' className='h-[600px] w-[500px]'/>
            </div>
            <div className='w-[680px] ml-16'>
              <h1 className='text-2xl font-bold text-stone-900'>Avail Online Cake Delivery in India via Best Cake Shop</h1>
              <div className='mt-2 mb-3'>
              <p className='text-stone-500 text-justify	'>Cakes are integral when celebrating occasions like birthdays or anniversaries, which is why we all look for the best place to get delicious cakes. Speaking of the perfect cake shops, FlowerAura, an FSSAI-certified bakery, adds sparkle to your occasions with cakes that will surely leave a lasting impression. Our online cake shop ensures your remarkable moments become memorable with our range of finely baked cakes and doorstep cake delivery service. There’s no need to think twice before choosing FlowerAura, as we provide an umpteen array of cake flavours, such as Red Velvet, Chocolate, Vanilla, Butterscotch, Black Forest, Strawberry, Fruits, etc.</p>
              </div>
              <h1 className='text-2xl font-bold text-stone-900'>Make Birthdays Unforgettable: Send Scrumptious Designer Cakes Online in India</h1>
              <div className='mt-3'>
              <p className='text-stone-500 text-justify	'>If you are looking for a lip-smackingly delicious birthday cake for your loved one, then FlowerAura is the place for you. We understand that every birthday celebration deserves a delicious cake and to provide you with the best experience, FlowerAura brings a delicious cake to your doorstep via a swift online cake delivery service. We provide online cake delivery in over 600+ cities across India, and we are known for our best-rated delivery service in all these cities. Whether it's your friend's birthday or your grandma's, rest assured we have cakes for all. With a 100% Happiness Guarantee promise, explore and order cakes online from FlowerAura for birthday celebrations. We understand every preference, which is why our collection also includes Vegan and eggless cakes. We acknowledge the importance of surprising your loved ones with a delicious cake on their birthdays.we also provide midnight cake delivery through which you can buy and send birthday cakes to your dear ones at midnight. So, without further ado, explore our collection of hearty birthday cakes, pick your favourites, and surprise your lovely ones with a lip-smacking delight delivered swiftly via our online cake delivery.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <HorizontalCardProduct category={"birthday"} heading={"Bestseller Cakes"} />

      <VerticalCardProduct category={"anniversary"} heading={"Anniversary Cakes"} />
      <VerticalCardProduct category={"designer"} heading={"Designer Cakes"} />
      <VerticalCardProduct category={"regular"} heading={"Regular Cakes"} />
      <VerticalCardProduct category={"photo"} heading={"Photo Cakes"} />
      <VerticalCardProduct category={"birthday"} heading={"Birthday Cakes"} />
      <VerticalCardProduct category={"no-egg"} heading={"No-egg Cakes"} />
      
    </div>
  )
}

export default Home