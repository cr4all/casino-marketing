const ids = [
  "photo-1557804506-669a67965ba0",
  "photo-1551288049-bebda4e38f71",
  "photo-1596838136351-bd778072754e",
  "photo-1574629810360-7efbbe195018",
  "photo-1554224311-bc0332ce7953",
  "photo-1621761190629-c143fb9145bf",
  "photo-1607860104238-2582f7fb5472",
  "photo-1460925895917-afdab827c52f",
  "photo-1522071820081-009f0129c71c",
  "photo-1551836022-d5d88eacb8df",
  "photo-1563986768609-322da13575f3",
  "photo-1450101499163-c8848c66ca85",
  "photo-1551434678-e076c223a692",
  "photo-1516321318423-f06f85e504b3",
  "photo-1451187580459-43490279c0fa",
  "photo-1511512578047-dfb367046420",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1561070791-2526d30994b5",
];

for (const id of ids) {
  const url = `https://images.unsplash.com/${id}?w=600&q=85`;
  const res = await fetch(url, { method: "HEAD", redirect: "follow" });
  console.log(res.status, id);
}
