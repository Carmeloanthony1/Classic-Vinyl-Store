import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart_items, setCart_items] = useState([]);

  useEffect(() => {
    const saved_cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart_items(
      saved_cart.map((item) => ({
        ...item,
        selected: item.selected ?? true,
        quantity: item.quantity || item.qty || 1,
      }))
    );
  }, []);

  const sync_cart = (updated) => {
    setCart_items(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handletoggle_selected = (id) => {
    const updated = cart_items.map((item) => {
      const currentID = item._id || item.id;
      return currentID === id ? { ...item, selected: !item.selected } : item;
    });
    sync_cart(updated);
  };

  const handleremove = (id) => {
    const updated = cart_items.filter((item) => (item._id || item.id) !== id);
    sync_cart(updated);
  };

  const handletambah_QTY = (id) => {
    const updated = cart_items.map((item) => {
      const currentID = item._id || item.id;
      if (currentID !== id) return item;
      const currentQTY = Number(item.quantity) || 1;
      return { ...item, quantity: currentQTY + 1 };
    });
    sync_cart(updated);
  };

  const handlekurang_QTY = (id) => {
    const updated = cart_items.map((item) => {
      const currentID = item._id || item.id;
      if (currentID !== id) return item;
      const currentQTY = Number(item.quantity) || 1;
      if (currentQTY <= 1) {
        alert("Tidak bisa mengurangi produk hingga kurang dari 1");
        return item;
      }
      return { ...item, quantity: currentQTY - 1 };
    });
    sync_cart(updated);
  };

  const totalharga = cart_items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className="w-full min-h-screen p-6 md:p-16 flex justify-center items-center font-serif">
      <img
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-65"
        src="/background_payment.webp"
        alt="Background"
      />

      {/* Outer Card Container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col bg-[#f9ebd2] rounded-3xl border-[3px] border-[#c89d54] shadow-[0_20px_50px_rgba(30,18,10,0.45)] overflow-hidden">
        {/* Decorative Corner Vinyl Grooves (Top-Left & Bottom-Right) */}
        <svg
          className="pointer-events-none absolute top-0 left-0 w-44 h-44 text-[#2b1a10]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path d="M0 0 H110 C85 55 45 85 0 100 Z" fill="currentColor" />
          <path
            d="M0 120 C60 105 105 60 125 0"
            stroke="#c89d54"
            strokeWidth="1.5"
            opacity="0.55"
          />
          <path
            d="M0 140 C72 122 125 72 145 0"
            stroke="#c89d54"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>

        <svg
          className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 text-[#2b1a10]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path d="M200 200 H95 C120 145 155 115 200 100 Z" fill="currentColor" />
          <path
            d="M200 80 C140 95 95 140 75 200"
            stroke="#c89d54"
            strokeWidth="1.5"
            opacity="0.55"
          />
          <path
            d="M200 60 C128 78 75 128 55 200"
            stroke="#c89d54"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </svg>

        {/* Header */}
        <div className="relative z-10 w-full flex justify-between items-center text-[#2b1a10] px-10 md:px-24 pt-7 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Your shopping cart
          </h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            title="Back"
            className="w-11 h-11 rounded-full bg-[#2b1a10] text-[#f9ebd2] flex items-center justify-center shadow-md hover:bg-[#42291a] transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        {cart_items.length === 0 ? (
          <p className="relative z-10 py-16 text-center font-bold text-2xl text-[#2b1a10] min-h-[320px] flex items-center justify-center">
            Keranjang masih kosong
          </p>
        ) : (
          <div className="relative z-10 flex flex-col divide-y divide-[#c89d54]/30 px-6 md:px-12 pb-10">
            {cart_items.map((item) => {
              const itemID = item._id || item.id;
              return (
                <div
                  key={itemID}
                  className="flex flex-wrap lg:flex-nowrap items-center justify-between py-6 gap-6"
                >
                  <div className="relative flex items-center justify-center pl-2">
                    <span className="pointer-events-none absolute -top-3 -left-1 text-[#c89d54] text-xs">
                      ✦
                    </span>
                    <span className="pointer-events-none absolute -top-2 -right-3 text-[#c89d54] text-sm">
                      ✦
                    </span>
                    <button
                      type="button"
                      onClick={() => handletoggle_selected(itemID)}
                      aria-label="Select item"
                      className={`w-13 h-13 rounded-full flex items-center justify-center transition cursor-pointer shadow-inner ${
                        item.selected
                          ? "bg-[#c69749] text-white"
                          : "bg-[#e7d3b0] border-2 border-[#c69749] text-transparent"
                      }`}
                    >
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="hidden lg:block w-[1px] h-28 bg-[#c89d54]/45" />

                  <div className="relative flex items-center pr-12 shrink-0">
                    <img
                      src={item.cover || item.image}
                      alt={item.title}
                      className="relative z-10 w-36 h-36 object-cover rounded shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                    />
                    <div
                      className="absolute right-1 w-32 h-32 rounded-full shadow-lg flex items-center justify-center"
                      style={{
                        background:
                          "repeating-radial-gradient(circle at center, #141414 0px, #141414 2px, #2b2b2b 3px, #141414 4px)",
                      }}
                    >
                      <div className="w-11 h-11 rounded-full bg-[#c89d54] border-2 border-[#2b1a10] flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f9ebd2]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-[200px] text-left font-cinzel text-[#2b1a10]">
                    <h2 className="font-bold text-2xl md:text-3xl leading-tight break-words uppercase tracking-wide">
                      {item.title}
                    </h2>
                    <p className="italic font-serif text-lg md:text-xl text-[#4a3222] mt-1 truncate">
                      {item.artist}
                    </p>
                  </div>

                  <div className="hidden lg:block w-[1px] h-28 bg-[#c89d54]/45" />

                  <div className="flex items-center bg-[#2b1a10] text-[#f9ebd2] rounded-full px-3 py-2 shadow-md">
                    <button
                      type="button"
                      onClick={() => handlekurang_QTY(itemID)}
                      className="w-9 h-9 flex items-center justify-center text-xl font-bold hover:text-[#dfb58d] transition cursor-pointer"
                    >
                      −
                    </button>
                    <span className="px-5 text-xl font-semibold select-none">
                      {item.quantity || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handletambah_QTY(itemID)}
                      className="w-9 h-9 flex items-center justify-center text-xl font-bold hover:text-[#dfb58d] transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-cinzel font-semibold text-lg text-[#2b1a10] whitespace-nowrap px-2">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>

                  <div className="hidden lg:block w-[1px] h-28 bg-[#c89d54]/45" />

                  <button
                    type="button"
                    onClick={() => handleremove(itemID)}
                    className="flex items-center gap-2.5 text-[#2b1a10] hover:text-red-800 transition cursor-pointer pr-2"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span className="text-lg font-medium">Remove</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}