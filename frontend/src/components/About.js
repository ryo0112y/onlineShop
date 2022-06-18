import React from "react";

const About = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="mt-4 mb-4">
          <strong>Our Company</strong>
        </h1>
        <div className="container">
          <img
            src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/143-72908.jpg"
            height="420px" className="mb-5"
          ></img>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h2 className="text-left">
          <strong>Our Heritage</strong>
        </h2>
        <p className="mt-5">
          Our story begins in 1971 along the cobblestone streets of Seattle’s
          historic Pike Place Market. It was here where Starbucks opened its
          first store, offering fresh-roasted coffee beans, tea and spices from
          around the world for our customers to take home. Our name was inspired
          by the classic tale, “Moby-Dick,” evoking the seafaring tradition of
          the early coffee traders.
        </p>
        <p className="mt-5">
          Ten years later, a young New Yorker named Howard Schultz would walk
          through these doors and become captivated with Starbucks coffee from
          his first sip. After joining the company in 1982, a different
          cobblestone road would lead him to another discovery. It was on a trip
          to Milan in 1983 that Howard first experienced Italy’s coffeehouses,
          and he returned to Seattle inspired to bring the warmth and artistry
          of its coffee culture to Starbucks. By 1987, we swapped our brown
          aprons for green ones and embarked on our next chapter as a
          coffeehouse.
        </p>
        <p className="mt-5">
          Starbucks would soon expand to Chicago and Vancouver, Canada and then
          on to California, Washington, D.C. and New York. By 1996, we would
          cross the Pacific to open our first store in Japan, followed by Europe
          in 1998 and China in 1999. Over the next two decades, we would grow to
          welcome millions of customers each week and become a part of the
          fabric of tens of thousands of neighborhoods all around the world. In
          everything we do, we are always dedicated to Our Mission: to inspire
          and nurture the human spirit – one person, one cup, and one
          neighborhood at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
