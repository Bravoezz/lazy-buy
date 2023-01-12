import { product } from "../../../prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(400).send({ message: "Not found" });

  const { productId } = req.query;

  try {
    const updateProduct = await product.update({
      where: {
        id: parseInt(productId),
      },
    });
    
    return res
      .status(202)
      .json({ ok: true, message: "Product modified successfully!" });
  } catch (error) {
    return res
      .status(404)
      .json({ ok: false, message: "Product hasn't been modified" });
  }
}
