const web3 = require("../../services/blockChainService");

const getLastBlock = async (req, res, next) => {
    try {
      // 🔍 Obtener el número del último bloque
      const blockNumber = await web3.eth.getBlockNumber();
      console.log("📌 Último bloque minado:", blockNumber);
  
      // 🔍 Obtener los detalles completos del bloque
      const block = await web3.eth.getBlock(blockNumber);
  
      if (!block) {
        return res.status(404).json({ error: "No se pudo obtener el último bloque" });
      }
  
      console.log("✅ Bloque completo obtenido:", block);
  
      // ✅ Convertir BigInt a String antes de enviar
      const formattedBlock = JSON.parse(JSON.stringify(block, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
      ));
  
      return res.status(200).json({ block: formattedBlock });
    } catch (error) {
      console.error("🚨 Error al obtener el último bloque:", error);
      return res.status(500).json({ error: "No se pudo obtener el último bloque" });
    }
  };
  


const getInfoBlock = async (req, res, next) => {
    try {
        
        console.log(`Consultando el bloque: ${req.params.block} 🔍`);
        const block = await web3.eth.getBlock(req.params.block.toString());

        if (!block) {
            console.error(`🚨 Bloque ${req.params.block} no encontrado`);
            return res.status(404).json({ error: `El bloque ${req.params.block} no existe` });
        }

        console.log("✅ Bloque obtenido:", block);

        // ✅ Convertir todos los valores BigInt a String para evitar errores de serialización
        const formattedBlock = JSON.parse(JSON.stringify(block, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        ));

        return res.status(200).json({ block: formattedBlock });
    } catch (error) {
        console.error("🚨 Error al obtener el bloque:", error);
        return res.status(400).json({ error: "No se pudo obtener el bloque" });
    }
};



// const getInfoTx = () => {
//     try{

//     }
//     catch (error) {
//         console.error("🚨 Error al obtener el bloque:", error);
//         return res.status(400).json({ error: "No se pudo obtener el bloque" });
//     }
// };
// const getInfoCounter = async (req, res) => {
//     try {
//         const { address } = req.params; // Obtener dirección de la cuenta desde la URL

//         if (!address) {
//             return res.status(400).json({ error: "Dirección de cuenta no proporcionada" });
//         }

//         console.log(`📌 Consultando cantidad de transacciones de la cuenta: ${address}`);

//         // 🔍 Obtener el número de transacciones enviadas desde la cuenta
//         const transactionCount = await web3.eth.getTransactionCount(address);

//         return res.status(200).json({ count: transactionCount });
//     } catch (error) {
//         console.error("🚨 Error al obtener la cantidad de transacciones:", error);
//         return res.status(500).json({ error: "No se pudo obtener la cantidad de transacciones" });
//     }
// };


module.exports = { getInfoBlock, getInfoCounter, getInfoTx, getLastBlock };
