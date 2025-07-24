// Composable pour créer des murs latéraux de drag & drop

export const useDragConstraints = () => {
  
  // Créer des murs latéraux simples - juste gauche et droite
  const createSolidWalls = (container: HTMLElement) => {
    if (!container) return () => {}

    let animationFrameId: number | null = null
    const containerRect = container.getBoundingClientRect()
    
    // Murs seulement sur les côtés avec padding
    const SIDE_PADDING = 20
    const walls = {
      left: container.offsetLeft + SIDE_PADDING,
      right: container.offsetLeft + container.offsetWidth - SIDE_PADDING
    }
    
    // Surveiller le drag et empêcher de sortir des côtés
    const preventSideOverflow = () => {
      const dragElements = container.querySelectorAll('[data-swapy-item]')
      
      dragElements.forEach(element => {
        const htmlElement = element as HTMLElement
        const rect = htmlElement.getBoundingClientRect()
        
        // Calculer position relative au conteneur
        const elementLeft = rect.left
        const elementRight = rect.right
        
        let needsCorrection = false
        let newTransform = ''
        
        // Empêcher débordement côté gauche
        if (elementLeft < walls.left) {
          const correction = walls.left - elementLeft
          newTransform = `translateX(${correction}px)`
          needsCorrection = true
        }
        
        // Empêcher débordement côté droit
        if (elementRight > walls.right) {
          const correction = walls.right - elementRight
          newTransform = `translateX(${correction}px)`
          needsCorrection = true
        }
        
        // Appliquer correction si nécessaire
        if (needsCorrection) {
          htmlElement.style.transform = newTransform
          htmlElement.style.transition = 'transform 0.1s ease-out'
          
          // Reset transition après
          setTimeout(() => {
            htmlElement.style.transition = ''
          }, 100)
        }
      })
      
      animationFrameId = requestAnimationFrame(preventSideOverflow)
    }
    
    // Démarrer la surveillance
    animationFrameId = requestAnimationFrame(preventSideOverflow)
    
    return () => {
      // Cleanup
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }

  // Configuration Swapy avec contraintes
  const getSwapyConfig = (container: HTMLElement) => {
    const rect = container.getBoundingClientRect()
    
    return {
      animation: 'dynamic',
      dragAxis: 'both' as const,
      continuousMode: false,
      manualSwap: true,
      // Contraintes de zone
      constraints: {
        minX: rect.left + 10,
        maxX: rect.right - 10,
        minY: rect.top + 10,
        maxY: rect.bottom - 10
      }
    }
  }

  // Indicateurs visuels simples pour les murs latéraux
  const addVisualWalls = (container: HTMLElement) => {
    container.style.position = 'relative'
    
    // Juste des bordures latérales subtiles
    container.style.borderLeft = '3px solid #dc2626'
    container.style.borderRight = '3px solid #dc2626'
    container.style.borderRadius = '1rem'
    
    // Indicateurs visuels sur les côtés seulement
    const leftIndicator = document.createElement('div')
    leftIndicator.className = 'drag-wall-left'
    leftIndicator.style.cssText = `
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 0;
      width: 3px;
      background: linear-gradient(to bottom, #dc2626, #7f1d1d, #dc2626);
      pointer-events: none;
      z-index: 999;
      border-radius: 2px;
    `
    
    const rightIndicator = document.createElement('div')
    rightIndicator.className = 'drag-wall-right'
    rightIndicator.style.cssText = `
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: 0;
      width: 3px;
      background: linear-gradient(to bottom, #dc2626, #7f1d1d, #dc2626);
      pointer-events: none;
      z-index: 999;
      border-radius: 2px;
    `
    
    container.appendChild(leftIndicator)
    container.appendChild(rightIndicator)
  }

  const removeVisualWalls = (container: HTMLElement) => {
    // Supprimer les marqueurs
    const markers = container.querySelectorAll('.drag-constraint-marker')
    markers.forEach(marker => marker.remove())
    
    // Supprimer les murs visuels
    const walls = container.querySelectorAll('[class^="drag-wall-"]')
    walls.forEach(wall => wall.remove())
    
    // Reset styles
    container.style.border = ''
    container.style.boxShadow = ''
    container.style.overflow = ''
  }

  return {
    createSolidWalls,
    getSwapyConfig,
    addVisualWalls,
    removeVisualWalls
  }
}