import React from "react";
import Image from "next/image";
import coffe from "@/assets/images/coffe2.png";
import diet from "@/assets/images/lowcarbdiet.jpg";

const TrustedHealthInfo = () => {
  return (
    <div className="bg-darkblue text-white p-8">
      {/* Heading and Paragraph */}
      <div className="text-center mb-8 bg-blue-950 p-2">
        <h1 className="text-3xl font-bold mb-4 ">
          Health information you can trust
        </h1>
      </div>

      {/* Two Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            General health and lifestyle
          </h2>
          <Image
            src={diet}
            alt="diet"
            className=" object-cover h-64 rounded-sm mb-4"
          />
          <p className="mb-4">
            What is a low-carb diet and is it healthy? Melissa McCarthy
            reportedly lost a lot of weight with the keto diet, while Kim
            Kardashian shifted the post-baby pounds with the Atkins 40 diet. But
            is a low-carb diet safe and appropriate for everyone? When it comes
            to healthy eating, every food group is important. This includes
            carbohydrates, the high-energy food group that fuels everything we
            do, from breathing to running. However, as foods rich in
            carbohydrates provide a lot of energy, low-carb diets have been
            adopted by people wishing to achieve significant weight loss.
          </p>
          <p className="text-sm text-gray-600">by Amberley Davis</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            General health and lifestyle
          </h2>
          <Image
            src={coffe}
            alt="coffe"
            className=" h-64 rounded-sm object-center mb-4 "
          />
          <p className="mb-4">
            Is mushroom coffee really good for you? Mushroom coffee has been
            brewing up a storm in the wellness world. Famed for its potential
            advantages over regular coffee, mushroom coffee includes a mix of
            supplemental mushrooms, each claiming to offer distinctive health
            perks. But what exactly is mushroom coffee? How is it made? And do
            its benefits live up to the hype?
          </p>
          <p className="text-sm text-gray-600">by Victoria Raw</p>
        </div>
      </div>
    </div>
  );
};

export default TrustedHealthInfo;
