import * as THREE from 'three'

export const animate = () => {
  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000,
  )
  camera.position.z = 5

  // scene
  const scene = new THREE.Scene()

  // renderer
  const renderer = new THREE.WebGLRenderer()
  // set the size of the renderer
  renderer.setSize(window.innerWidth, window.innerHeight)

  // add the renderer to the html document body
  document.body.appendChild(renderer.domElement)

  const stars: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = []
  function addSphere() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for (let z = -1000; z < 1000; z += 20) {
      // Make a sphere (exactly the same as before).
      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const sphere = new THREE.Mesh(geometry, material)

      // This time we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 500
      sphere.position.y = Math.random() * 1000 - 500

      // Then set the z position to where it is in the loop (distance of camera)
      sphere.position.z = z

      // scale it up a bit
      sphere.scale.x = 2
      sphere.scale.y = 2

      // add the sphere to the scene
      scene.add(sphere)

      // finally push it to the stars array
      stars.push(sphere)
    }
  }

  function animateStars() {
    // loop through each star
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i]

      // and move it forward dependent on the mouseY position.
      star.position.z += i / 10

      // if the particle is too close move it to the back
      if (star.position.z > 1000) star.position.z -= 2000
    }
  }

  function render() {
    // get the frame
    requestAnimationFrame(render)

    // render the scene
    renderer.render(scene, camera)
    animateStars()
  }

  addSphere()
  render()
}
