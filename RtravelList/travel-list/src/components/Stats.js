export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Añade algunos items a tu equipaje</em>
      </footer>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const porcentaje = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {porcentaje === 100
          ? `Tienes todo empacado, estás listo para irte!`
          : `Tienes ${numItems} items en tu lista, y ya empacaste ${numPacked} (
        ${porcentaje}%)`}
      </em>
    </footer>
  );
}
