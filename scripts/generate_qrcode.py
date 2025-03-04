from PIL import Image
import qrcode

# Generate the QR code
qr = qrcode.QRCode(
    version=5,  # Version controls the size (1–40, larger = more capacity)
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction for image overlay
    box_size=10,
    border=4,
)
qr.add_data(
    "https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.onato.AR4Manager"
)
qr.make(fit=True)

# Create the QR code image
qr_img = qr.make_image(fill="black", back_color="white").convert("RGBA")

# Open the logo image
logo = Image.open("assets/images/doc-logo.png")

# Resize the logo
qr_size = qr_img.size[0]  # Get QR code size
logo_size = qr_size // 4  # Logo should be about 1/4th of QR code size
logo.thumbnail((logo_size, logo_size), Image.LANCZOS)

# Compute position for the center
pos = ((qr_img.size[0] - logo.size[0]) // 2, (qr_img.size[1] - logo.size[1]) // 2)

# Overlay the logo onto the QR code
qr_img.paste(logo, pos, logo if logo.mode == "RGBA" else None)

# Save the final QR code
qr_img.save("qrcode_with_logo.png")

print("QR code with logo saved as 'qrcode_with_logo.png'")
