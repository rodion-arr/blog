import { usePathname } from 'next/navigation';
import NextLink, { LinkProps } from 'next/link';
import React, { PropsWithChildren, useState, useEffect, CSSProperties } from 'react';

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName?: string;
  style?: CSSProperties;
};

export const Link = ({
  children,
  activeClassName = '',
  className = '',
  style,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = new URL((props.as || props.href) as string, location.href).pathname;

    // Using URL().pathname to get rid of query and hash
    const activePathname = new URL(pathname, location.href).pathname;

    const isActiveLink =
      (props.href !== '/' && activePathname.includes(linkPathname)) ||
      linkPathname === activePathname;

    const newClassName = isActiveLink ? `${className} ${activeClassName}`.trim() : className;

    if (newClassName !== computedClassName) {
      setComputedClassName(newClassName);
    }
  }, [pathname, props.as, props.href, activeClassName, className, computedClassName]);

  return (
    <NextLink className={computedClassName} {...props}>
      {style && <span style={style}>{children}</span>}
      {!style && <>{children}</>}
    </NextLink>
  );
};
