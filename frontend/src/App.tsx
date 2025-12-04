// src/App.tsx  ←  GUARANTEED TO SHOW THE RED CAR
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d1117)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(60, 50, 80)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    scene.add(ground)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 1.2)
    sun.position.set(100, 200, 100)
    sun.castShadow = true
    scene.add(sun)

    // Load buildings from backend
    const buildings: THREE.Mesh[] = []
    fetch('http://localhost:3000/world')
      .then(r => r.json())
      .then(data => {
        data.buildings.forEach((b: any) => {
          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(b.size[0], b.size[1], b.size[2]),
            new THREE.MeshStandardMaterial({ color: 0x4488ff })
          )
          mesh.position.set(b.position[0], b.position[1] + b.size[1] / 2, b.position[2])
          mesh.castShadow = true
          mesh.receiveShadow = true
          scene.add(mesh)
          buildings.push(mesh)
        })
      })

    // RED CAR — BIG AND BRIGHT SO YOU CANNOT MISS IT
    const car = new THREE.Group()
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(5, 2.5, 10),
      new THREE.MeshStandardMaterial({ color: 0xff0044 })
    )
    body.position.y = 1.25
    body.castShadow = true
    car.add(body)

    // make it even more obvious
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1.5, 6),
      new THREE.MeshStandardMaterial({ color: 0xffff00 })
    )
    roof.position.y = 2.8
    car.add(roof)

    car.position.set(0, 0, -100)   // start far back
    scene.add(car)

    // Point cloud
    const pointsGeo = new THREE.BufferGeometry()
    const pointsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
    const points = new THREE.Points(pointsGeo, pointsMat)
    scene.add(points)

    const positions = new Float32Array(512 * 3) // 512 rays this time
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const raycaster = new THREE.Raycaster()

    // 512 rays in a full sphere around the car
    const dirs: THREE.Vector3[] = []
    for (let i = 0; i < 512; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      )
      dirs.push(dir)
    }

    let carZ = -100
    const animate = () => {
      carZ += 0.2
      if (carZ > 200) carZ = -100
      car.position.z = carZ

      const lidarOrigin = car.position.clone().add(new THREE.Vector3(0, 3, 0))

      let i = 0
      for (const dir of dirs) {
        raycaster.set(lidarOrigin, dir)
        const hit = raycaster.intersectObjects(buildings)
        if (hit.length > 0 && hit[0].distance < 120) {
          const p = hit[0].point
          positions[i * 3]     = p.x
          positions[i * 3 + 1] = p.y
          positions[i * 3 + 2] = p.z
        } else {
          positions[i * 3] = positions[i * 3 + 1] = positions[i * 3 + 2] = NaN
        }
        i++
      }
      pointsGeo.attributes.position.needsUpdate = true

      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
}