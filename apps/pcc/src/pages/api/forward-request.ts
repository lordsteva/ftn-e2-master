//044 -> 036606
//050 -> 558773

const banks = { '036606': 'http://localhost:1111', '587737': 'http://localhost:1112' };
export default async function handler(req, res) {
  const {
    card: { pan },
  } = JSON.parse(req.body);

  const bankId = pan.substring(1, 7);

  const bankUrl = banks[bankId];

  if (!bankUrl) {
    res.status(500).json({});
    return;
  }
  try {
    const response = await fetch(`${bankUrl}/api/check-issuer`, {
      method: 'POST',
      body: req.body,
    });

    const resData = await response.json();
    console.log(resData);
    res.status(200).json({ ...resData });
  } catch (e) {
    console.log(e);
  }
}
