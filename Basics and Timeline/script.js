// Basic GSAP Animation Example
// This code animates two boxes with different properties using GSAP
// gsap.to("#box1", { // .to animates element to the specified properties
//     x: 300,
//     duration: 0.7,
//     delay: 1,
//     rotate: 360,
//     backgroundColor: "#ff00ff",
// })

// gsap.from("#box2", { // .from animates element from the specified properties
//     x: 300,
//     duration: 0.7,
//     delay: 1,
//     borderRadius: "10%",
//     scale: 1.1,
// })

// Staggered Animation Example

// gsap.from("h1", { // Uncomment this line and h1's from html file to animate all h1 elements
//   duration: 1,
//   opacity: 0,
//   stagger: 0.5, // Stagger the animation for each h1 element
// });


// Repeat and Yoyo Animation Example

// gsap.to("#box1", {
//     x: 300,
//     duration: 3,
//     delay: 1,
//     rotate: 360,
//     borderRadius: "50%",
//     backgroundColor: "#ff00ff",
//     repeat: -1, // Repeat indefinitely
//     yoyo: true, // Reverse the animation on each repeat
// });


// GSAP Timeline Example - for sequential animations

const tl = gsap.timeline()

tl.from("h2", {
    y: -20,
    opacity: 0,
    duration: 0.3,
})

tl.from("li", {
    y: -20,
    opacity: 0,
    duration: 0.3,
    stagger: 0.2, // Stagger the animation for each li element
})

tl.from('.box', {
    x: -100,
    y: 100,
    opacity: 0,
    duration: 0.3,
    stagger: 0.2, // Stagger the animation for each box element
})