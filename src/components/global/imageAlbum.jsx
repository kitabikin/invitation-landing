import Image from 'next/image';

function ImageAlbum({
  imageProps: { src, alt, title, sizes, className, onClick },
  wrapperStyle,
}) {
  return (
    <div style={wrapperStyle}>
      <div
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <Image
          layout="fill"
          src={src}
          alt={alt}
          title={title}
          sizes={sizes}
          className={className}
          onClick={onClick}
          objectFit={'cover'}
        />
      </div>
    </div>
  );
}

export default ImageAlbum;
