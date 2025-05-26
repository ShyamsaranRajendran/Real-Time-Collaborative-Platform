"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// For illustration purposes - using placeholders for the animation
const cursorColors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF3380'];

export function HeroSection() {
  const [animationPlaying, setAnimationPlaying] = useState(true);

  useEffect(() => {
    // Animation can be paused/resumed based on UI state
    const timer = setTimeout(() => setAnimationPlaying(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Collaborate in Real-Time,{" "}
              <span className="text-primary">Seamlessly</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Edit documents together with your team, see changes as they happen, and never worry about conflicts again.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mt-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl rounded-lg border bg-card shadow-lg">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-sm font-medium">Untitled Document</div>
            </div>
          </div>
          
          <div className="relative p-6 h-[300px] overflow-hidden bg-card">
            <div className="text-lg">
              <p>The collaborative document editing platform enables teams to work together in real-time.</p>
              <p className="mt-4">Key features include:</p>
              <ul className="mt-2 list-disc list-inside">
                <li>Real-time synchronization</li>
                <li>Multiple cursor support</li>
                <li>Version history</li>
                <li>Rich text formatting</li>
              </ul>
            </div>
            
            {animationPlaying && (
              <>
                {cursorColors.map((color, index) => (
                  <motion.div 
                    key={index}
                    className="absolute pointer-events-none"
                    style={{ 
                      zIndex: 50,
                      originX: 0,
                      originY: 0,
                    }}
                    initial={{ 
                      x: 100 + index * 30, 
                      y: 100 + index * 15
                    }}
                    animate={{ 
                      x: [
                        100 + index * 30, 
                        200 + index * 20, 
                        300 - index * 10, 
                        250 - index * 25, 
                        100 + index * 30
                      ],
                      y: [
                        100 + index * 15, 
                        150 - index * 5, 
                        200 + index * 10, 
                        180 - index * 8, 
                        100 + index * 15
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      times: [0, 0.25, 0.5, 0.75, 1],
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <div 
                      style={{ 
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: `16px solid ${color}`,
                        transform: 'rotate(-45deg)'
                      }}
                    />
                    <div className="mt-1 px-2 py-1 text-xs text-white rounded-md" style={{ backgroundColor: color, whiteSpace: 'nowrap' }}>
                      User {index + 1}
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
          
          <div className="p-4 border-t bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
            <div>5 users editing</div>
            <div>Last saved 2 minutes ago</div>
          </div>
        </div>
      </div>
    </section>
  );
}