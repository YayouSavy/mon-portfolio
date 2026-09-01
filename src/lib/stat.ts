/**
 * Taille du chiffre d'une fiche statistique, ajustée à la longueur de la valeur.
 *
 * Les valeurs vont de « 3 » à « Zéro handoff » : une taille unique ferait déborder les
 * plus longues de leur carte, surtout dans les post-its carrés de l'accueil. Trois paliers
 * suffisent, et la valeur reste toujours la plus grosse typo de sa fiche.
 */
export function statNumClass(num: string) {
  const n = num.length;
  if (n <= 4) return "text-[clamp(40px,3.8vw,58px)]";
  if (n <= 7) return "text-[clamp(32px,3vw,46px)]";
  return "text-[clamp(23px,2.1vw,32px)]";
}
