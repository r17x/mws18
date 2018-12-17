/**
 * @params {object} e as event 
 */
onmessage = (e) => {
    const {data} = e;
    const {x, y} = data;
    console.log(`Mendapatkan Pesan Dari hitung-angka.html`,e);
    const result = parseInt(x || 0) + parseInt(y || 0);
    console.log(`Hasil Jumlah x ${x} + y ${y} : ${result}`);
    postMessage(result);
}
