const getPreviewImg = (type) => {
  if (type == "PDF") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712924091/PDF_i6w2tv.png";
  }

  if (type == "DOCX") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778291/DoNotDelete/xxxxx---DOCX_tg7efe.png";
  }
  if (type == "PPTX") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778292/DoNotDelete/xxxxx---PPTX_ede7hj.png";
  }
  if (type == "XLSX") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778296/DoNotDelete/xxxxx---XLSX_ikqmtt.png";
  }
  if (type == "RAR") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778298/DoNotDelete/xxxxx---ZIP_vobuiq.png";
  }
  if (type == "ZIP") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778298/DoNotDelete/xxxxx---ZIP_vobuiq.png";
  }
  if (type == "AUDIO") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778299/DoNotDelete/xxxxx---AUDIO_c1wfrp.png";
  }
  if (type == "VIDEO") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778297/DoNotDelete/xxxxx---VIDEO_g9dnwm.png";
  }
  if (type == "TXT") {
    return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778294/DoNotDelete/xxxxx---TXT_uhobij.png";
  }

  return "https://res.cloudinary.com/dkysrpdi6/image/upload/v1712778295/DoNotDelete/xxxxx---UK_u9khku.png";
};

export default getPreviewImg;
