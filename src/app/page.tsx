"use client";

import Link from "next/link";
import React from "react";

const HomePage = () => {
  const features = [
    {
      title: "useQuery",
      description: "Fetch and cache data with automatic refetching and background updates",
      icon: "📥",
    },
    {
      title: "useMutation",
      description: "Handle CREATE, UPDATE, and DELETE operations with optimistic updates",
      icon: "⚡",
    },
    {
      title: "Query Invalidation",
      description: "Automatically refresh data after mutations to keep UI in sync",
      icon: "🔄",
    },
    {
      title: "Loading States",
      description: "Built-in loading, error, and success states for better UX",
      icon: "⏳",
    },
  ];

  const modules = [
    {
      title: "Karyawan Management",
      description: "Manage employee data with full CRUD operations",
      icon: "👥",
      href: "/karyawan",
      color: "blue",
    },
    {
      title: "User Management",
      description: "Handle user accounts and permissions",
      icon: "👤",
      href: "/user",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0-1.1-.9-2-2-2H8c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h8c1.1 0 2-.9 2 2v3m0 0l-3-3m3 3l-3 3" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CRUD Demo App</h1>
                <p className="text-sm text-gray-500">TanStack Query Implementation</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">CRUD Application</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contoh implementasi operasi <span className="font-semibold text-blue-600">Create, Read, Update, Delete</span> menggunakan
            <span className="font-semibold text-indigo-600"> TanStack Query</span> dengan hooks
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">useQuery</code> dan
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">useMutation</code>
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">TanStack Query Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Available Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {modules.map((module, index) => (
              <Link key={index} href={module.href}>
                <div className={`bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 cursor-pointer group`}>
                  <div className="text-center">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{module.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{module.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                    <div
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                        module.color === "blue" ? "bg-blue-50 text-blue-700 group-hover:bg-blue-100" : "bg-green-50 text-green-700 group-hover:bg-green-100"
                      }`}
                    >
                      Explore Module
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tech Stack Info */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tech Stack & Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
              <p className="text-sm text-gray-600">Next.js 14, React, TypeScript, Tailwind CSS</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 1.79 4 4 4h8c0-1.1-.9-2-2-2H8c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h8c1.1 0 2-.9 2 2v3" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">State Management</h4>
              <p className="text-sm text-gray-600">TanStack Query (React Query) v5</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">API & Database</h4>
              <p className="text-sm text-gray-600">REST API, Prisma ORM</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">© 2024 CRUD Demo Application. Built with Next.js and TanStack Query.</p>
            <p className="text-xs mt-2">Demonstrating modern React patterns for data fetching and state management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
