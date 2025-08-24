"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    jabatan: "",
    umur: 0,
    gaji: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "umur" || name === "gaji" ? parseInt(value) || 0 : value,
    }));
  };

  const queryClient = useQueryClient();
  const router = useRouter();

  const addKaryawan = async (data: any) => {
    const response = await fetch("/api/karyawans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add karyawan");
    }

    return response.json();
  };

  const createUserMutation = useMutation({
    mutationFn: addKaryawan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karyawans"] });
      setFormData({
        name: "",
        jabatan: "",
        umur: 0,
        gaji: 0,
      });
      router.push("/karyawan");
    },
    onError: (error) => {
      console.error("Error adding karyawan:", error);
      alert("Error adding karyawan: " + error.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.jabatan.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.umur <= 0 || formData.gaji <= 0) {
      alert("Age and salary must be greater than 0");
      return;
    }

    createUserMutation.mutate(formData);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Karyawan</h1>
            <p className="text-gray-600">Add a new employee to your database</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Karyawan <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                onChange={handleChange}
                value={formData.name}
                type="text"
                name="name"
                placeholder="Masukkan nama karyawan"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="jabatan" className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                id="jabatan"
                onChange={handleChange}
                value={formData.jabatan}
                type="text"
                name="jabatan"
                placeholder="Masukkan jabatan karyawan"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="umur" className="block text-sm font-medium text-gray-700 mb-2">
                Umur <span className="text-red-500">*</span>
              </label>
              <input
                id="umur"
                onChange={handleChange}
                value={formData.umur || ""}
                type="number"
                name="umur"
                placeholder="Masukkan umur karyawan"
                required
                min="1"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="gaji" className="block text-sm font-medium text-gray-700 mb-2">
                Gaji <span className="text-red-500">*</span>
              </label>
              <input
                id="gaji"
                onChange={handleChange}
                value={formData.gaji || ""}
                type="number"
                name="gaji"
                placeholder="Masukkan gaji karyawan"
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={createUserMutation.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {createUserMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  "Tambah Karyawan"
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/karyawan")}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Success/Error Messages could be added here */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Make sure to fill all required fields marked with <span className="text-red-500">*</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
