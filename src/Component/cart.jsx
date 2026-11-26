import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Cart() {
  const navigate = useNavigate();
  const { id, order_id } = useParams();
  const [cart_items, setCart_items] = useState([]);
  const [isprocess, setIsprocess] = useState(false);
  const [quantity, setQuantity] = useState(1)

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

  const order = async () => {
    const selectedITEM = cart_items
      .filter((item) => item.selected)
      .map((item) => ({
        product_id: item._id || item.id,
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity) || 1
      }))

    if (selectedITEM.length === 0){
      alert("Silahkan memesan suatu barang terlebih dahulu");
      return;
    }

    setIsprocess(true);
    try {
        const response = await fetch("http://localhost:8000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: selectedITEM })
        });

        const data = await response.json();

        if(response.ok){
          const remainingCart = cart_items.filter((item) => !item.selected);
          sync_cart(remainingCart);
          
          const targetProductId = id || selectedITEM[0].product_id;
          navigate(`/Payment/${targetProductId}/${data.order_id}`, {
            state: {
              items: selectedITEM,
              totalharga: data.total_price ?? totalharga
            }
          });
        } else {
            alert("Gagal membuat pesanan");
        }
    } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan server");
    } finally {
        setIsprocess(false);
    }
  };

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

  const isAllSelected =
    cart_items.length > 0 && cart_items.every((item) => Boolean(item.selected));

  const handleToggleSelectAll = () => {
    const nextSelected = !isAllSelected;
    const updated = cart_items.map((item) => ({
      ...item,
      selected: nextSelected,
    }));
    sync_cart(updated);
  };

  const totalharga = cart_items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className="w-full min-h-screen p-6 md:p-10 flex flex-col justify-center items-center font-serif">
      <img
        className="fixed inset-0 w-full h-full object-cover -z-10 opacity-65"
        src="/background_payment.webp"
        alt="Background"
      />

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5">
        <div className="relative w-full h-[48vh] min-h-[420px] flex flex-col bg-[#f9ebd2] rounded-3xl border-[3px] border-[#c89d54] shadow-[0_20px_50px_rgba(30,18,10,0.45)] overflow-hidden">
          <svg
            className="pointer-events-none absolute top-0 left-0 w-44 h-44 text-[#2b1a10] z-0"
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
            className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 text-[#2b1a10] z-0"
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

          <div className="relative z-10 shrink-0 w-full flex justify-between items-center text-[#2b1a10] px-10 md:px-24 pt-6 pb-3">
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

          {cart_items.length === 0 ? (
            <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center">
              <p className="text-center font-bold text-2xl text-[#2b1a10]">
                Keranjang masih kosong
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex-1 min-h-0 overflow-y-auto flex flex-col divide-y divide-[#c89d54]/30 px-6 md:px-12 pb-6 [scrollbar-width:thin] [scrollbar-color:#c89d54_transparent]">
              {cart_items.map((item) => {
                const itemID = item._id || item.id;
                return (
                  <div
                    key={itemID}
                    className="shrink-0 flex flex-wrap lg:flex-nowrap items-center justify-between py-5 gap-6"
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
                        className="relative z-10 w-32 h-32 object-cover rounded shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                      />
                      <div
                        className="absolute right-1 w-28 h-28 rounded-full shadow-lg flex items-center justify-center"
                        style={{
                          background:
                            "repeating-radial-gradient(circle at center, #141414 0px, #141414 2px, #2b2b2b 3px, #141414 4px)",
                        }}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#c89d54] border-2 border-[#2b1a10] flex items-center justify-center">
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
                      Rp {Number(item.price * item.quantity).toLocaleString("id-ID")}
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

        <div className="w-full min-h-[76px] bg-[#2b1a10]/95 text-[#f9ebd2] rounded-2xl border-[2.5px] border-[#c89d54] shadow-[0_14px_35px_rgba(30,18,10,0.45)] px-6 md:px-10 py-3.5 flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleToggleSelectAll}
              aria-label="Select all items"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition cursor-pointer shadow-inner shrink-0 ${
                isAllSelected
                  ? "bg-[#c69749] text-[#2b1a10]"
                  : "bg-[#3d2618] border-2 border-[#c89d54] text-transparent"
              }`}
            >
              <svg
                className="w-5 h-5"
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

            <span
              onClick={handleToggleSelectAll}
              className="text-base md:text-lg font-medium tracking-wide cursor-pointer select-none hover:text-[#dfb58d] transition"
            >
              Select All
            </span>

            <div className="hidden md:block w-[1px] h-9 bg-[#c89d54]/40 ml-2" />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <div className="flex items-baseline gap-3">
              <span className="text-base md:text-lg text-[#f9ebd2]/85 tracking-wide">
                Total :
              </span>
              <span className="font-cinzel font-bold text-xl md:text-2xl text-[#e5b869]">
                Rp {Number(totalharga).toLocaleString("id-ID")}
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-9 bg-[#c89d54]/40" />

            <button
              type="button"
              disabled={totalharga === 0}
              onClick={order}
              className="px-7 py-2.5 rounded-full bg-[#dfb58d] text-[#2b1a10] font-cinzel font-bold text-base md:text-lg tracking-wider shadow-md hover:brightness-105 active:scale-[0.98] disabled:opacity-45 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}