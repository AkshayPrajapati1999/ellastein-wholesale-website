import React from "react";

const Button = () => {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
      >
        Button
      </button>
    </div>
  );
}

const Theme = () => {
  return (
    <div>
      <div className="bg-gray-lightest text-black font-primary">
        <div className="container padding mx-auto">
          <h1 className="text-3xl font-bold mb-4">Tailwind CSS Example</h1>

          <div className="mb-8">
            <div className="bg-black text-white p-4 mb-4">Black Background</div>
            <div className="bg-gray-dark text-white p-4 mb-4">
              Dark Gray Background
            </div>
            <div className="bg-white border border-border p-4 mb-4">
              White Background with Border
            </div>
            <div className="bg-red-lightest p-4 mb-4">
              Lightest Red Background
            </div>
            <div className="bg-blue-light p-4 mb-4">Light Blue Background</div>
          </div>

          <div className="mb-8">
            <p className="text-text-lighter">
              This text has the color of the lighter shade.
            </p>
            <p className="text-text-secondary">
              This text has the color of the secondary shade.
            </p>
          </div>

          <div className="mb-8">
            <div className="shadow-custom-shadow p-4 mb-4">Custom Shadow</div>
            <div className="shadow-custom-light-shadow p-4 mb-4">
              Custom Light Shadow
            </div>
          </div>

          <div className="mb-8">
            <p className="font-primary">
              This paragraph uses the primary font.
            </p>
            <p className="font-secondary">
              This paragraph uses the secondary font.
            </p>
          </div>

          <div className="mb-8">
            <div className="w-icon-md h-icon-md bg-blue p-2 mb-4">
              Custom Sized Blue Icon
            </div>
            <div className="w-icon-lg h-icon-lg bg-red p-2 mb-4">
              Custom Sized Red Icon
            </div>
          </div>

          <div className="mb-8">
            <p className="tracking-tight">
              This text has tight letter spacing.
            </p>
          </div>

          <div className="mb-8">
            <p className="app-heading-xl">This is Extra Large Heading</p>
            <p className="app-heading-lg">This is Large Heading</p>
            <p className="app-heading-md">This is Medium Heading</p>
            <p className="app-heading-sm">This is Small Heading</p>
            <p className="app-heading-xs">This is Extra Small Heading</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Theme;
