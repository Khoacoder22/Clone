import React, { useEffect, useState } from "react"
import axios from "axios"
axios.defaults.withCredentials = true

type Supplier = {
  id: string
  name: string
  address: string
  phone: string
}

function SupplierPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState<Omit<Supplier, "id">>({
    name: "",
    address: "",
    phone: "",
  })

  const API_URL = "http://localhost:9000/admin/suppliers"

  const loadSuppliers = async () => {
    try {
      const res = await axios.get(API_URL)
      if (Array.isArray(res.data)) setSuppliers(res.data)
      else if (Array.isArray(res.data.suppliers)) setSuppliers(res.data.suppliers)
      else if (res.data.supplier) setSuppliers([res.data.supplier])
    } catch (err) {
      console.error("Load suppliers failed:", err)
    }
  }

  const createSupplier = async () => {
    try {
      await axios.post(API_URL, form)
      setForm({ name: "", address: "", phone: "" })
      setShowModal(false)
      await loadSuppliers()
    } catch (err) {
      console.error("Create supplier failed:", err)
    }
  }

  const deleteSupplier = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      await loadSuppliers()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  useEffect(() => {
    loadSuppliers()
  }, [])

  return (
    <>
      {/* PAGE */}
      <div className="flex w-full max-w-[1600px] flex-col gap-y-2 p-3">

        {/* Header Card */}
        <div className="shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg divide-y p-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="font-sans font-medium h1-core">Supplier</h1>
              <p className="font-normal font-sans txt-small text-ui-fg-subtle">
                Manage supplier information
              </p>
            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={() => setShowModal(true)}
              className="transition-fg relative inline-flex items-center justify-center overflow-hidden 
              rounded-md outline-none shadow-buttons-neutral text-ui-fg-base 
              bg-ui-button-neutral hover:bg-ui-button-neutral-hover 
              active:bg-ui-button-neutral-pressed txt-compact-small-plus 
              px-3 py-1.5"
            >
              Create
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto mt-4 bg-ui-bg-base rounded-lg shadow">
          <table className="text-ui-fg-subtle txt-compact-small w-full">
            <thead className="border-y border-ui-border-base bg-ui-bg-subtle">
              <tr className="bg-ui-bg-base border-b">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-ui-bg-base-hover border-b transition"
                >
                  <td className="px-6 py-3">{s.name}</td>
                  <td className="px-6 py-3">{s.address}</td>
                  <td className="px-6 py-3">{s.phone}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => deleteSupplier(s.id)}
                      className="text-red-600 hover:text-red-700 transition txt-compact-small-plus"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {suppliers.length === 0 && (
            <div className="px-6 py-4 text-ui-fg-subtle">No suppliers found.</div>
          )}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">

          {/* MODAL PANEL (Medusa style) */}
          <div className="bg-ui-bg-base w-[420px] rounded-lg shadow-elevation-card-rest p-6 animate-fadeIn">

            <h2 className="font-medium text-lg mb-4">Create Supplier</h2>

            <div className="space-y-4">

              <div>
                <p className="txt-compact-small-plus mb-1">Name</p>
                <input
                  className="border-ui-border-base border rounded-md px-3 py-2 w-full"
                  placeholder="Supplier name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div>
                <p className="txt-compact-small-plus mb-1">Address</p>
                <input
                  className="border-ui-border-base border rounded-md px-3 py-2 w-full"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              <div>
                <p className="txt-compact-small-plus mb-1">Phone</p>
                <input
                  className="border-ui-border-base border rounded-md px-3 py-2 w-full"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 pt-2">

                {/* Cancel */}
                <button
                  onClick={() => setShowModal(false)}
                  className="transition-fg inline-flex items-center justify-center 
                  rounded-md bg-ui-button-transparent hover:bg-ui-button-transparent-hover 
                  active:bg-ui-button-transparent-pressed txt-compact-small-plus 
                  px-3 py-1.5"
                >
                  Cancel
                </button>

                {/* Save */}
                <button
                  onClick={createSupplier}
                  className="transition-fg inline-flex items-center justify-center 
                  rounded-md bg-ui-button-primary text-ui-fg-on-color 
                  hover:bg-ui-button-primary-hover active:bg-ui-button-primary-pressed 
                  txt-compact-small-plus px-3 py-1.5"
                >
                  Save
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SupplierPage
