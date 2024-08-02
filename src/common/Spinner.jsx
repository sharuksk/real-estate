import React from 'react';
import './Spinner.css'; // Import the custom CSS

export const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
  <div class="loader">
  <div class="box box0">
    <div></div>
  </div>
  <div class="box box1">
    <div></div>
  </div>
  <div class="box box2">
    <div></div>
  </div>
  <div class="box box3">
    <div></div>
  </div>
  <div class="box box4">
    <div></div>
  </div>
  <div class="box box5">
    <div></div>
  </div>
  <div class="box box6">
    <div></div>
  </div>
  <div class="box box7">
    <div></div>
  </div>
  <div class="ground">
    <div></div>
  </div>
</div>
  </div>
  );
};


