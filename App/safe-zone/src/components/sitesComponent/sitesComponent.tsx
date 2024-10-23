import { useState } from "react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@components/ui/select";
import { Card, CardContent } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import './sitesComponent.css';

// Definición del componente
export default function SitesComponent() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      className={`bg-background rounded-lg shadow-sm transition-all ${
        expanded ? "fixed inset-0 z-50 w-full h-full" : "w-[300px]"
      }`}
    >
      <div className={`flex flex-col gap-4 p-4 ${expanded ? "h-full" : "h-[200px]"}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Acme Inc</h3>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            <ChevronDownIcon className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-muted-foreground line-clamp-2">
          Acme Inc is a leading provider of innovative products and services. We are committed to delivering
          high-quality solutions to our customers.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Website</span>
            <span className="text-muted-foreground">acme.com</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Type</span>
            <span className="text-muted-foreground">Manufacturing</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Location</span>
            <span className="text-muted-foreground">Anytown, USA</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Employees</span>
            <span className="text-muted-foreground">500+</span>
          </div>
        </div>
        {expanded && (
          <div className="flex-1 overflow-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search companies..."
                  className="bg-muted rounded-md px-3 py-2 text-sm"
                />
                <Button variant="outline" size="sm">
                  Search
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="bg-muted rounded-md px-3 py-2 text-sm">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-4">
              <Card>
                <CardContent className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Company logo"
                      className="rounded-md"
                      style={{ aspectRatio: "64/64", objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Globex Inc</h4>
                      <Badge variant="outline">Technology</Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      Globex Inc is a leading provider of innovative technology solutions for businesses of all sizes.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Company logo"
                      className="rounded-md"
                      style={{ aspectRatio: "64/64", objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Stark Industries</h4>
                      <Badge variant="outline">Manufacturing</Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      Stark Industries is a global leader in advanced manufacturing and engineering solutions.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src="/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Company logo"
                      className="rounded-md"
                      style={{ aspectRatio: "64/64", objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Retail Emporium</h4>
                      <Badge variant="outline">Retail</Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      Retail Emporium is a premier destination for high-quality consumer goods and exceptional customer
                      service.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de Icono Chevron
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
