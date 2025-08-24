"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditKaryawan = () => {
  const [formData, setFormData] = useState({
    name: "",
    jabatan: "",
    umur: 0,
    gaji: 0,
  });

  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch existing karyawan data
  const { data: karyawan, isLoading } = useQuery({
    queryKey: ["karyawan", id],
    queryFn: async () => {
      const res = await fetch(`/api/karyawans/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!id,
  });

  // Update form data when karyawan data is loaded
  useEffect(() => {
    if (karyawan) {
      setFormData({
        name: karyawan.name || "",
        jabatan: karyawan.jabatan || "",
        umur: karyawan.umur || 0,
        gaji: karyawan.gaji || 0,
      });
    }
  }, [karyawan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "umur" || name === "gaji" ? parseInt(value) || 0 : value,
    }));
  };

  const updateKaryawan = async (data: any) => {
    const response = await fetch(`/api/karyawans/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update karyawan");
    }

    return response.json();
  };

  const updateMutation = useMutation({
    mutationFn: updateKaryawan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karyawans"] });
      queryClient.invalidateQueries({ queryKey: ["karyawan", id] });
      router.push("/karyawan");
    },
    onError: (error) => {
      console.error("Error updating karyawan:", error);
      alert("Error updating karyawan: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!karyawan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Karyawan Not Found</h2>
          <p className="text-gray-600 mb-4">The employee you're looking for doesn't exist.</p>
          <button onClick={() => router.push("/karyawan")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Back to Employee List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Karyawan</h1>
            <p className="text-gray-600">Update employee information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Karyawan
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
                Jabatan
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
                Umur
              </label>
              <input
                id="umur"
                onChange={handleChange}
                value={formData.umur}
                type="number"
                name="umur"
                placeholder="Masukkan umur karyawan"
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="gaji" className="block text-sm font-medium text-gray-700 mb-2">
                Gaji
              </label>
              <input
                id="gaji"
                onChange={handleChange}
                value={formData.gaji}
                type="number"
                name="gaji"
                placeholder="Masukkan gaji karyawan"
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-md transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {updateMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "Update Karyawan"
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
        </div>
      </div>
    </div>
  );
};

export default EditKaryawan;
