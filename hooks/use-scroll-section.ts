"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollSection() {
  const [activeSection, setActiveSection] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveRef = useRef<string>("");

  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "contact"];
    
    const getActiveSection = (): string => {
      const scrollPosition = window.scrollY + 150; // Смещение для точности
      let currentActive = "";

      // Проходим по всем секциям и находим ту, которая находится в viewport
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const { offsetTop, offsetHeight } = section;
        const sectionBottom = offsetTop + offsetHeight;
        const viewportMiddle = scrollPosition;

        // Если середина viewport находится в пределах секции
        if (viewportMiddle >= offsetTop && viewportMiddle < sectionBottom) {
          currentActive = sectionId;
          break;
        }
      }

      // Если не нашли точное попадание, выбираем ближайшую секцию сверху
      if (!currentActive) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const section = document.getElementById(sectionId);
          if (section && scrollPosition >= section.offsetTop - 100) {
            currentActive = sectionId;
            break;
          }
        }
      }

      return currentActive;
    };

    const handleScroll = () => {
      // Debounce для избежания скачков
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const newActive = getActiveSection();
        
        // Обновляем только если изменилось
        if (newActive && newActive !== lastActiveRef.current) {
          lastActiveRef.current = newActive;
          setActiveSection(newActive);
        }
      }, 50);
    };

    // Intersection Observer для более точного определения
    const observers: IntersectionObserver[] = [];
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Используем intersectionRatio для более точного определения
            if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
              const newActive = sectionId;
              if (newActive !== lastActiveRef.current) {
                lastActiveRef.current = newActive;
                setActiveSection(newActive);
              }
            }
          });
        },
        observerOptions
      );

      observer.observe(section);
      observers.push(observer);
    });

    // Начальная проверка
    const initialActive = getActiveSection();
    if (initialActive) {
      lastActiveRef.current = initialActive;
      setActiveSection(initialActive);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}

