import "../../css/vanilla/product.css";

// CLASS COMPONENT
export class VanillaProduct {
  constructor(product) {
    const productElement = document.createElement("div");
    productElement.classList.add(`product`, `${product.style.style}`);
    productElement.innerHTML = this.fillProductElement(product);
    this.addEventListeners(productElement);
    return productElement;
  }

  fillQuantityElement(product) {
    if (product.qty > 1) return ``;
    return `<div class="product-quantity">
            Only ${product.qty} left!
        </div>`;
  }

  fillProductElement(product) {
    return `
        <div class="product-image-wrap" title="${product.name}">
            <img class="product-image" src="${product.style.image}" alt="${
      product.name
    }">
        </div>
        <div class="product-info">
            ${this.fillQuantityElement(product)}
            <div class="product-title bold">${product.name}</div>
            <p>${product.description}</p>
            <div class="product-price bold">$${product.price}</div>
            <button class="product-button bold">More Info</button>
        </div>`;
  }

  addEventListeners(productElement) {
    productElement.addEventListener("click", () => {
      console.log("Clicked on product");
    });
  }
}
