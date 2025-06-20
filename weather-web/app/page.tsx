"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock weather data - in a real app, this would come from a weather API
const mockWeatherData = {
  current: {
    location: "New York, NY",
    temperature: 72,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    pressure: 30.12,
    feelsLike: 75,
    uvIndex: 6,
  },
  forecast: [
    { day: "Today", high: 75, low: 62, condition: "Partly Cloudy", icon: "⛅", precipitation: 10 },
    { day: "Tomorrow", high: 78, low: 65, condition: "Sunny", icon: "☀️", precipitation: 0 },
    { day: "Wednesday", high: 73, low: 59, condition: "Rainy", icon: "🌧️", precipitation: 80 },
    { day: "Thursday", high: 69, low: 55, condition: "Cloudy", icon: "☁️", precipitation: 20 },
    { day: "Friday", high: 71, low: 58, condition: "Partly Cloudy", icon: "⛅", precipitation: 15 },
  ],
}

export default function WeatherWebsite() {
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherData, setWeatherData] = useState(mockWeatherData)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, this would fetch data from a weather API
      setWeatherData({
        ...weatherData,
        current: {
          ...weatherData.current,
          location: searchQuery,
        },
      })
      setSearchQuery("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Weather Now</h1>
          <p className="text-blue-100 text-lg">Get accurate weather information for any location</p>
        </header>

        {/* Search Bar */}
        <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
              <Button type="submit" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <CardTitle className="text-xl">{weatherData.current.location}</CardTitle>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">{formatDate(currentTime)}</p>
                    <p className="text-sm opacity-80">{formatTime(currentTime)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{weatherData.current.icon}</span>
                    <div>
                      <p className="text-5xl font-bold">{weatherData.current.temperature}°F</p>
                      <p className="text-lg opacity-80">{weatherData.current.condition}</p>
                      <p className="text-sm opacity-70">Feels like {weatherData.current.feelsLike}°F</p>
                    </div>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                    <Droplets className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm opacity-70">Humidity</p>
                      <p className="font-semibold">{weatherData.current.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                    <Wind className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm opacity-70">Wind Speed</p>
                      <p className="font-semibold">{weatherData.current.windSpeed} mph</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                    <Eye className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm opacity-70">Visibility</p>
                      <p className="font-semibold">{weatherData.current.visibility} mi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
                    <Gauge className="h-5 w-5 text-blue-300" />
                    <div>
                      <p className="text-sm opacity-70">Pressure</p>
                      <p className="font-semibold">{weatherData.current.pressure} in</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* UV Index Card */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  UV Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{weatherData.current.uvIndex}</div>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-200 border-orange-400/30">
                    Moderate
                  </Badge>
                  <p className="text-sm opacity-70 mt-2">Wear sunscreen when outdoors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="text-center bg-white/10 rounded-lg p-4">
                  <p className="font-semibold mb-2">{day.day}</p>
                  <div className="text-3xl mb-2">{day.icon}</div>
                  <p className="text-sm opacity-80 mb-2">{day.condition}</p>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{day.high}°</span>
                    <span className="opacity-70">{day.low}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Droplets className="h-3 w-3 text-blue-300" />
                    <span className="text-xs">{day.precipitation}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/70">
          <p>&copy; 2024 Weather Now. All rights reserved.</p>
          <p className="text-sm mt-1">Weather data updates every hour</p>
        </footer>
      </div>
    </div>
  )
}
