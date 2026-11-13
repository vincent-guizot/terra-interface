import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { RecordStockMovementDto } from './dto/record-stock-movement.dto';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@ApiTags('Inventory Transaction Ledger')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('items')
  @ApiOperation({
    summary: 'Get inventory stock items with mathematically derived balances',
    description: 'Retrieves current items across storage locations with balance calculated from immutable movements.',
  })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category (Feeds, Seeds, Biologicals, etc.)' })
  @ApiQuery({ name: 'lowStockOnly', required: false, type: Boolean, description: 'Filter items below reorder threshold' })
  @ApiResponse({ status: 200, description: 'List of inventory stock items' })
  async getItems(
    @Query('category') category?: string,
    @Query('lowStockOnly') lowStockOnly?: boolean,
  ) {
    return this.inventoryService.getItems(category, lowStockOnly);
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Get single inventory item with full movement ledger' })
  @ApiResponse({ status: 200, description: 'Inventory item details with audit movements' })
  async getItemById(@Param('id') id: string) {
    return this.inventoryService.getItemById(id);
  }

  @Post('items')
  @ApiOperation({ summary: 'Create new inventory catalog SKU item' })
  @ApiResponse({ status: 201, description: 'Item created' })
  async createItem(@Body() dto: CreateInventoryItemDto) {
    return this.inventoryService.createItem(dto);
  }

  @Get('locations')
  @ApiOperation({ summary: 'Get all physical storage locations' })
  @ApiResponse({ status: 200, description: 'List of storage locations with item counts' })
  async getStorageLocations() {
    return this.inventoryService.getStorageLocations();
  }

  @Get('movements')
  @ApiOperation({
    summary: 'Get immutable stock movement ledger stream',
    description: 'Audit log of all stock inflows and outflows across the homestead.',
  })
  @ApiQuery({ name: 'itemId', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of stock movement transactions' })
  async getMovements(
    @Query('itemId') itemId?: string,
    @Query('limit') limit?: number,
  ) {
    return this.inventoryService.getMovements(itemId, limit ? Number(limit) : 50);
  }

  @Post('movements')
  @ApiOperation({
    summary: 'Record an immutable stock movement transaction',
    description: 'Appends a movement to the ledger and recalculates stock balance.',
  })
  @ApiResponse({ status: 201, description: 'Movement recorded and balance updated' })
  async recordMovement(@Body() dto: RecordStockMovementDto) {
    return this.inventoryService.recordMovement(dto);
  }

  @Get('alerts/low-stock')
  @ApiOperation({ summary: 'Get low stock reorder alerts' })
  @ApiResponse({ status: 200, description: 'List of stock alerts for replenishing' })
  async getLowStockAlerts() {
    return this.inventoryService.getLowStockAlerts();
  }
}
