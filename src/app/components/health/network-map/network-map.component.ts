import { Component, OnInit } from '@angular/core';
import { Node, Edge } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';

interface INetworkMapNode {
  id: string;
  title: string;
  active: boolean;
  group?: string;
  icon?: string;
  number?: number;
  externalLabel?: boolean;
  children?: INetworkMapNode[];
}

const globalMap: INetworkMapNode = {
  id: '0',
  title: 'NMDC',
  active: true,
  children: [
    {
      id: '1',
      title: 'S-Radar',
      group: 'primary',
      active: true,
    },
    {
      id: '2',
      title: 'S-AIS',
      group: 'primary',
      active: true,
    },
    {
      id: '3',
      title: 'Weather',
      icon: 'cctv',
      group: 'primary',
      active: true,
    },
    {
      id: '4',
      title: 'RFMC',
      number: 1,
      group: 'secondary',
      active: true,
      children: [
        {
          id: '9',
          title: 'Secondary sensor',
          active: true,
        },
        {
          id: '10',
          title: 'Camera',
          active: true,
        },
        {
          id: '11',
          title: 'Radar',
          active: false,
        },
        {
          id: '12',
          title: 'VHF',
          active: true,
        },
        {
          id: '13',
          title: 'AIS',
          active: true,
        },
      ],
    },
    {
      id: '5',
      title: 'RFMC',
      number: 2,
      group: 'secondary',
      active: true,
      children: [
        {
          id: '14',
          title: 'Radar',
          active: true,
        },
        {
          id: '15',
          title: 'VHF',
          active: true,
        },
        {
          id: '16',
          title: 'AIS',
          active: true,
        },
      ],
    },
    {
      id: '6',
      title: 'RFMC',
      number: 3,
      active: true,
      group: 'secondary',
      children: [
        {
          id: '17',
          title: 'Radar',
          active: true,
        },
        {
          id: '18',
          title: 'VHF',
          active: true,
        },
        {
          id: '19',
          title: 'AIS',
          active: true,
        },
      ],
    },
    {
      id: '7',
      title: 'RFMC',
      number: 4,
      active: true,
      group: 'secondary',
      children: [
        {
          id: '20',
          title: 'Radar',
          active: true,
        },
        {
          id: '21',
          title: 'VHF',
          active: true,
        },
        {
          id: '22',
          title: 'AIS',
          active: true,
        },
      ],
    },
    {
      id: '8',
      title: 'RFMC',
      number: 5,
      active: true,
      group: 'secondary',
      children: [
        {
          id: '23',
          title: 'Radar',
          active: true,
        },
        {
          id: '24',
          title: 'VHF',
          active: true,
        },
        {
          id: '25',
          title: 'AIS',
          active: true,
        },
        {
          id: '26',
          title: 'Secondary sensor',
          active: true,
        },
        {
          id: '27',
          title: 'Camera',
          active: true,
        },
      ],
    },
  ]
};

@Component({
  selector: 'app-network-map',
  templateUrl: './network-map.component.html',
  styleUrls: ['./network-map.component.scss']
})
export class NetworkMapComponent implements OnInit {
  public visibleNodes: Node[] = [];
  public visibleLinks: Edge[] = [];
  public curve: any = shape.curveLinear;
  public layoutSettings = {
    orientation: 'TB',
  };
  public update$: Subject<boolean> = new Subject();
  public panToNode$: Subject<string> = new Subject();

  private map = globalMap;
  private nodes: Node[] = [];
  private links: Edge[] = [];

  ngOnInit() {
    this.mapNodesAndLinks();
  }

  public toggleChildren(nodeId: string): void {
    const node = this.nodes.find(n => n.id === nodeId);

    if (!node.data.root && node.data.children) {
      node.data.children.forEach(childId => {
        const child = this.nodes.find(n => n.id === childId);

        if (child.data.visible && child.data.children) {
          this.hideChildren(child);
        }

        child.data.visible = !child.data.visible;
      });

      this.setVisibleNodesAndLinks();
      this.update$.next(true);
    }
  }



  private mapNodesAndLinks(): void {
    this.mapNode(this.map, true, true);
    this.setVisibleNodesAndLinks();
  }

  private mapNode(node: INetworkMapNode, root: boolean, visible: boolean, parent?: INetworkMapNode): void {
    const data: any = { ...node, root, visible };

    delete data.id;

    if (data.children) {
      data.children = data.children.map(child => child.id);
    }

    if (node.children && !!node.children.find(child => !child.active)) {
      data.active = false;
    }

    this.nodes.push({
      id: node.id,
      label: node.title,
      data,
    });

    if (parent) {
      this.mapLink(node, parent);
    }

    if (node.children) {
      node.children.forEach(child => this.mapNode(child, false, root, node));
    }
  }

  private mapLink(node: INetworkMapNode, parent: INetworkMapNode): void {
    this.links.push({
      id: `link-${parent.id}-${node.id}`,
      source: parent.id,
      target: node.id,
    });
  }

  private setVisibleNodesAndLinks(): void {
    this.visibleNodes = this.nodes.filter(node => node.data.visible);
    const visibleNodeIds = this.visibleNodes.map(node => node.id);
    this.visibleLinks = this.links.filter(link => visibleNodeIds.includes(link.target));
  }

  private hideChildren(node: Node): void {
    node.data.children.forEach(childId => {
      const child = this.nodes.find(n => n.id === childId);

      child.data.visible = false;

      if (child.data.children) {
       this.hideChildren(child);
      }
    });
  }
}
