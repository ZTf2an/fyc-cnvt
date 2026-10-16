import { useRef, useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";

function TooltipedIcon ({ children , configObj}) {

  let badgeNumber , allowToShow , dropdownItems;

  if (!!configObj.links) {
    dropdownItems = configObj.links;
    badgeNumber = dropdownItems.length;
    allowToShow = 2;            
  };

  if (!!configObj.logs) {
    dropdownItems = configObj.logs;
    badgeNumber = dropdownItems.length;
    allowToShow = 1;
  };

  return (
    <Tooltip items={dropdownItems} allowed={badgeNumber>=allowToShow}>
      {/* Todo esto es el "children" que recibe el Tooltip */}
      <div className="position-relative d-inline-block">
        {children}
        {badgeNumber >= allowToShow && (
          <Badge
            bg="secondary"
            className="position-absolute translate-middle"
            style={{
              top: '90%',
              left: '80%',
              fontSize: '0.5em',
              borderRadius: '50px'
            }}
          >
            {badgeNumber}
          </Badge>
        )}
      </div>
    </Tooltip>
  );
}

export function Tooltip({ children , items , allowed = true }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  let DropdownMenu = <></>;

  //Validación para saber de qué tipo es Items
  if (typeof items === 'string') {
    DropdownMenu = <Dropdown.Menu>
      <Dropdown.Item>{items}</Dropdown.Item>
    </Dropdown.Menu>
  };

  if (Array.isArray(items)) {
    DropdownMenu = <Dropdown.Menu align="end">
      {items.map((item, index) => (
        <Dropdown.Item 
          key={index} 
          href={item.startsWith("http") ? item : ""}
          target="_blank"
        >
          { item.startsWith("http") ? `Link ${index + 1}` : item}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  };

  // Manejadores de Cursor
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); 
  };

  return (
    <Dropdown
      className="position-relative d-inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      show={showDropdown}
    >
      <Dropdown.Toggle as="div" bsPrefix="p-0 border-0 bg-transparent" style={{ cursor: 'pointer' }}>
        {children}
      </Dropdown.Toggle>

      {/* Renderiza el menú solo si hay items en el arreglo */}
      {items && allowed && (
        DropdownMenu
      )}
    </Dropdown>
  );
}

export default TooltipedIcon