import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  id: number;
  itemName: string;
  skuCode: string;
  batchNumber: string;
  sku: string;
  expiryDate: string;
  quantityInStock: number;
  unitOfMeasure: string;
  reorderLevel: number;
  storageLocation: string;
  usageLogs: string;
  purchasePrice: number;
  sellingPrice: number;
  type: 'consumer' | 'medication';
  supplier?: string;  // Optional supplier field
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="inventory-container">
      <div class="page-header">
        <h2>Inventory Details</h2>
        <div class="header-actions">
          <div class="search-box">
            <input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (input)="onSearch()">
            <button class="search-btn">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <button class="add-btn" (click)="openAddModal()">
            <i class="fas fa-plus"></i> Add Inventory
          </button>
        </div>
      </div>

      <div class="table-container">
        <div class="table-header">
          <div class="entries-info">
            Show
            <select [(ngModel)]="entriesPerPage" (change)="onEntriesPerPageChange()">
              <option [value]="10">10</option>
              <option [value]="20">20</option>
              <option [value]="50">50</option>
              <option [value]="100">100</option>
            </select>
            entries
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>SKU Code</th>
              <th>Batch Number</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Expiry Date</th>
              <th>Storage Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of paginatedItems">
              <td>{{item.itemName}}</td>
              <td>{{item.skuCode}}</td>
              <td>{{item.batchNumber}}</td>
              <td>{{item.quantityInStock}}</td>
              <td>{{item.unitOfMeasure}}</td>
              <td>{{item.expiryDate}}</td>
              <td>{{item.storageLocation}}</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn view" (click)="viewItem(item)">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-btn edit" (click)="editItem(item)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete" (click)="deleteItem(item)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-footer">
          <div class="entries-info">
            Showing {{(currentPage - 1) * entriesPerPage + 1}} to {{Math.min(currentPage * entriesPerPage, filteredItems.length)}} of {{filteredItems.length}} entries
          </div>
          <div class="pagination">
            <button [disabled]="currentPage === 1" (click)="onPageChange(1)" class="page-btn">
              <i class="fas fa-angle-double-left"></i>
            </button>
            <button [disabled]="currentPage === 1" (click)="onPageChange(currentPage - 1)" class="page-btn">
              <i class="fas fa-angle-left"></i>
            </button>
            <span class="page-info">Page {{currentPage}} of {{totalPages}}</span>
            <button [disabled]="currentPage === totalPages" (click)="onPageChange(currentPage + 1)" class="page-btn">
              <i class="fas fa-angle-right"></i>
            </button>
            <button [disabled]="currentPage === totalPages" (click)="onPageChange(totalPages)" class="page-btn">
              <i class="fas fa-angle-double-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Inventory Modal -->
      <div class="modal-backdrop" *ngIf="showAddModal" (click)="closeAddModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Add New Inventory Item</h2>
            <button class="close-btn" (click)="closeAddModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-content">
              <!-- Left Section -->
              <div class="left-section">
                <div class="nav-buttons">
                  <button [class.active]="activeSection === 'consumer'" (click)="setActiveSection('consumer')">
                    <i class="fas fa-box"></i>
                    <span>Consumer Form</span>
                  </button>
                  <button [class.active]="activeSection === 'medication'" (click)="setActiveSection('medication')">
                    <i class="fas fa-pills"></i>
                    <span>Medication Form</span>
                  </button>
                </div>
              </div>

              <!-- Right Section -->
              <div class="right-section">
                <!-- Consumer Form Section -->
                <div *ngIf="activeSection === 'consumer'" class="section-content">
                  <div class="section-header">
                    <div class="header-with-button">
                      <h3>Consumer Form Details</h3>
                      <button class="barcode-btn">
                        <i class="fas fa-plus"></i>
                        Barcode Scan
                      </button>
                    </div>
                  </div>
                  <div class="form-grid">
                    <div class="form-group">
                      <label for="itemName">Item Name *</label>
                      <input type="text" id="itemName" [(ngModel)]="newItem.itemName" required>
                    </div>
                    <div class="form-group">
                      <label for="skuCode">SKU / Item Code *</label>
                      <input type="text" id="skuCode" [(ngModel)]="newItem.skuCode" required>
                    </div>
                    <div class="form-group">
                      <label for="batchNumber">Batch Number *</label>
                      <input type="text" id="batchNumber" [(ngModel)]="newItem.batchNumber" required>
                    </div>
                    <div class="form-group">
                      <label for="sku">Stock Keeping Unit (SKU) *</label>
                      <input type="text" id="sku" [(ngModel)]="newItem.sku" required>
                    </div>
                    <div class="form-group">
                      <label for="expiryDate">Expiry Date *</label>
                      <input type="date" id="expiryDate" [(ngModel)]="newItem.expiryDate" required>
                    </div>
                    <div class="form-group">
                      <label for="quantityInStock">Quantity in Stock *</label>
                      <input type="number" id="quantityInStock" [(ngModel)]="newItem.quantityInStock" required>
                    </div>
                    <div class="form-group">
                      <label for="unitOfMeasure">Unit of Measure *</label>
                      <select id="unitOfMeasure" [(ngModel)]="newItem.unitOfMeasure" required>
                        <option value="pcs">Pieces</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="reorderLevel">Reorder Level *</label>
                      <input type="number" id="reorderLevel" [(ngModel)]="newItem.reorderLevel" required>
                    </div>
                    <div class="form-group">
                      <label for="storageLocation">Storage Location *</label>
                      <input type="text" id="storageLocation" [(ngModel)]="newItem.storageLocation" required>
                    </div>
                    <div class="form-group">
                      <label for="usageLogs">Usage Logs</label>
                      <textarea id="usageLogs" [(ngModel)]="newItem.usageLogs"></textarea>
                    </div>
                    <div class="form-group">
                      <label for="purchasePrice">Purchase Price *</label>
                      <input type="number" id="purchasePrice" [(ngModel)]="newItem.purchasePrice" required>
                    </div>
                    <div class="form-group">
                      <label for="sellingPrice">Selling Price *</label>
                      <input type="number" id="sellingPrice" [(ngModel)]="newItem.sellingPrice" required>
                    </div>
                  </div>
                </div>

                <!-- Medication Form Section -->
                <div *ngIf="activeSection === 'medication'" class="section-content">
                  <div class="section-header">
                    <div class="header-with-button">
                      <h3>Medication Form Details</h3>
                      <button class="barcode-btn" style="background-color: #10b981;">
                        <i class="fas fa-plus"></i>
                        Barcode Scan
                      </button>
                    </div>
                  </div>
                  <div class="form-grid">
                    <div class="form-group">
                      <label for="medName">Medication Name *</label>
                      <input type="text" id="medName" [(ngModel)]="newItem.itemName" required>
                    </div>
                    <div class="form-group">
                      <label for="medBatchNumber">Batch Number *</label>
                      <input type="text" id="medBatchNumber" [(ngModel)]="newItem.batchNumber" required>
                    </div>
                    <div class="form-group">
                      <label for="medExpiryDate">Expiry Date *</label>
                      <input type="date" id="medExpiryDate" [(ngModel)]="newItem.expiryDate" required>
                    </div>
                    <div class="form-group">
                      <label for="medSku">Stock Keeping Unit (SKU) *</label>
                      <input type="text" id="medSku" [(ngModel)]="newItem.sku" required>
                    </div>
                    <div class="form-group">
                      <label for="medQuantity">Quantity in Stock *</label>
                      <input type="number" id="medQuantity" [(ngModel)]="newItem.quantityInStock" required>
                    </div>
                    <div class="form-group">
                      <label for="medUnit">Unit of Measure *</label>
                      <select id="medUnit" [(ngModel)]="newItem.unitOfMeasure" required>
                        <option value="pcs">Pieces</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="medReorderLevel">Reorder Level *</label>
                      <input type="number" id="medReorderLevel" [(ngModel)]="newItem.reorderLevel" required>
                    </div>
                    <div class="form-group">
                      <label for="supplier">Supplier / Manufacturer *</label>
                      <input type="text" id="supplier" [(ngModel)]="newItem.supplier" required>
                    </div>
                    <div class="form-group">
                      <label for="medPurchasePrice">Purchase Price *</label>
                      <input type="number" id="medPurchasePrice" [(ngModel)]="newItem.purchasePrice" required>
                    </div>
                    <div class="form-group">
                      <label for="medSellingPrice">Selling Price *</label>
                      <input type="number" id="medSellingPrice" [(ngModel)]="newItem.sellingPrice" required>
                    </div>
                    <div class="form-group">
                      <label for="medStorageLocation">Storage Location *</label>
                      <input type="text" id="medStorageLocation" [(ngModel)]="newItem.storageLocation" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="footer-buttons">
              <button type="button" class="btn btn-secondary" (click)="resetForm()">
                <i class="fas fa-undo"></i> Reset
              </button>
              <button type="button" class="btn btn-secondary" (click)="closeAddModal()">
                <i class="fas fa-times"></i> Cancel
              </button>
              <button type="button" class="btn btn-primary" (click)="submitForm()">
                <i class="fas fa-check"></i> Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View Item Modal -->
      <div class="modal-backdrop" *ngIf="showViewModal" (click)="closeViewModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Inventory Item Details</h2>
            <button class="close-btn" (click)="closeViewModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="detail-grid">
              <div class="detail-row">
                <span class="label">Item Name:</span>
                <span class="value">{{selectedItem?.itemName}}</span>
              </div>
              <div class="detail-row">
                <span class="label">SKU Code:</span>
                <span class="value">{{selectedItem?.skuCode}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Batch Number:</span>
                <span class="value">{{selectedItem?.batchNumber}}</span>
              </div>
              <div class="detail-row">
                <span class="label">SKU:</span>
                <span class="value">{{selectedItem?.sku}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Expiry Date:</span>
                <span class="value">{{selectedItem?.expiryDate}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Quantity:</span>
                <span class="value">{{selectedItem?.quantityInStock}} {{selectedItem?.unitOfMeasure}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Reorder Level:</span>
                <span class="value">{{selectedItem?.reorderLevel}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Storage Location:</span>
                <span class="value">{{selectedItem?.storageLocation}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Purchase Price:</span>
                <span class="value">{{selectedItem ? '$' + selectedItem.purchasePrice : ''}}</span>
              </div>
              <div class="detail-row">
                <span class="label">Selling Price:</span>
                <span class="value">{{selectedItem ? '$' + selectedItem.sellingPrice : ''}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inventory-container {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 2rem);
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .page-header h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #1f2937;
      font-weight: 600;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .search-box input {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      width: 200px;
    }

    .search-box input:focus {
      outline: none;
      border-color: #406e8d;
    }

    .search-btn {
      padding: 0.5rem 1rem;
      background-color: #406e8d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .search-btn:hover {
      background-color: #345a77;
    }

    .add-btn {
      padding: 0.5rem 1rem;
      background-color: #10b981;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
    }

    .add-btn:hover {
      background-color: #059669;
    }

    .table-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background-color: #f9fafb;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .data-table td {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .data-table tr:hover {
      background-color: #f9fafb;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .action-btn.view {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.view:hover {
      background-color: #bae6fd;
    }

    .action-btn.edit {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    .action-btn.edit:hover {
      background-color: #bae6fd;
    }

    .action-btn.delete {
      background-color: #fee2e2;
      color: #dc2626;
    }

    .action-btn.delete:hover {
      background-color: #fecaca;
    }

    /* Modal Styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 1000px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.25rem;
      color: #1f2937;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }

    .close-btn:hover {
      color: #374151;
    }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
    }

    .modal-content {
      display: flex;
      gap: 2rem;
    }

    .left-section {
      width: 250px;
      flex-shrink: 0;
    }

    .nav-buttons {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-buttons button {
      padding: 0.75rem 1rem;
      border: 1px solid #e5e7eb;
      background-color: white;
      color: #4b5563;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .nav-buttons button:hover {
      background-color: #f9fafb;
    }

    .nav-buttons button.active {
      background-color: #406e8d;
      color: white;
      border-color: #406e8d;
    }

    .right-section {
      flex: 1;
    }

    .section-header {
      margin-bottom: 1.5rem;
    }

    .header-with-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .barcode-btn {
      padding: 0.5rem 1rem;
      background-color: #10b981;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.2s;
      font-size: 0.875rem;
    }

    .barcode-btn:hover {
      background-color: #059669;
    }

    .barcode-btn i {
      font-size: 0.875rem;
    }

    .section-header h3 {
      margin: 0;
      font-size: 1.125rem;
      color: #1f2937;
      font-weight: 600;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-size: 0.875rem;
      color: #4b5563;
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 0.875rem;
      color: #1f2937;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #406e8d;
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    .footer-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }

    .btn-secondary {
      background-color: #f3f4f6;
      color: #374151;
      border: 1px solid #e5e7eb;
    }

    .btn-secondary:hover {
      background-color: #e5e7eb;
    }

    .btn-primary {
      background-color: #406e8d;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: #345a77;
    }

    /* View Modal Styles */
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .value {
      font-size: 0.875rem;
      color: #1f2937;
      font-weight: 500;
    }

    .table-header {
      padding: 1rem;
      background-color: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
    }

    .entries-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .entries-info select {
      padding: 0.25rem 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      background-color: white;
      color: #1f2937;
      font-size: 0.875rem;
    }

    .table-footer {
      padding: 1rem;
      background-color: #f9fafb;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-btn {
      padding: 0.25rem 0.5rem;
      border: 1px solid #e5e7eb;
      background-color: white;
      color: #4b5563;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .page-btn:not(:disabled):hover {
      background-color: #f3f4f6;
      color: #1f2937;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      color: #4b5563;
      font-size: 0.875rem;
    }
  `]
})
export class InventoryComponent implements OnInit {
  searchQuery = '';
  showAddModal = false;
  showViewModal = false;
  activeSection: 'consumer' | 'medication' = 'consumer';
  selectedItem: InventoryItem | null = null;
  currentPage = 1;
  entriesPerPage = 10;
  Math = Math; // Make Math available in template

  newItem: Partial<InventoryItem> = {
    type: 'consumer'
  };

  items: InventoryItem[] = [
    {
      id: 1,
      itemName: 'Paracetamol 500mg',
      skuCode: 'SKU001',
      batchNumber: 'BATCH001',
      sku: 'SKU001',
      expiryDate: '2025-12-31',
      quantityInStock: 1000,
      unitOfMeasure: 'pcs',
      reorderLevel: 100,
      storageLocation: 'Shelf A1',
      usageLogs: 'Regular usage',
      purchasePrice: 0.5,
      sellingPrice: 1.0,
      type: 'medication',
      supplier: 'ABC Pharmaceuticals'
    },
    {
      id: 2,
      itemName: 'Bandages',
      skuCode: 'SKU002',
      batchNumber: 'BATCH002',
      sku: 'SKU002',
      expiryDate: '2026-12-31',
      quantityInStock: 500,
      unitOfMeasure: 'box',
      reorderLevel: 50,
      storageLocation: 'Shelf B2',
      usageLogs: 'First aid supplies',
      purchasePrice: 2.0,
      sellingPrice: 4.0,
      type: 'consumer'
    },
    {
      id: 3,
      itemName: 'Amoxicillin 250mg',
      skuCode: 'SKU003',
      batchNumber: 'BATCH003',
      sku: 'SKU003',
      expiryDate: '2025-06-30',
      quantityInStock: 750,
      unitOfMeasure: 'pack',
      reorderLevel: 100,
      storageLocation: 'Shelf C3',
      usageLogs: 'Antibiotic medication',
      purchasePrice: 1.5,
      sellingPrice: 3.0,
      type: 'medication',
      supplier: 'XYZ Pharma Ltd'
    },
    {
      id: 4,
      itemName: 'Digital Thermometer',
      skuCode: 'SKU004',
      batchNumber: 'BATCH004',
      sku: 'SKU004',
      expiryDate: '2027-12-31',
      quantityInStock: 100,
      unitOfMeasure: 'pcs',
      reorderLevel: 20,
      storageLocation: 'Shelf D4',
      usageLogs: 'Medical equipment',
      purchasePrice: 5.0,
      sellingPrice: 12.0,
      type: 'consumer'
    },
    {
      id: 5,
      itemName: 'Ibuprofen 400mg',
      skuCode: 'SKU005',
      batchNumber: 'BATCH005',
      sku: 'SKU005',
      expiryDate: '2025-09-30',
      quantityInStock: 1200,
      unitOfMeasure: 'box',
      reorderLevel: 150,
      storageLocation: 'Shelf A2',
      usageLogs: 'Pain relief medication',
      purchasePrice: 0.8,
      sellingPrice: 1.8,
      type: 'medication',
      supplier: 'MediCorp Inc'
    },
    {
      id: 6,
      itemName: 'First Aid Kit',
      skuCode: 'SKU006',
      batchNumber: 'BATCH006',
      sku: 'SKU006',
      expiryDate: '2026-06-30',
      quantityInStock: 50,
      unitOfMeasure: 'box',
      reorderLevel: 10,
      storageLocation: 'Shelf B3',
      usageLogs: 'Emergency supplies',
      purchasePrice: 15.0,
      sellingPrice: 30.0,
      type: 'consumer'
    },
    {
      id: 7,
      itemName: 'Omeprazole 20mg',
      skuCode: 'SKU007',
      batchNumber: 'BATCH007',
      sku: 'SKU007',
      expiryDate: '2025-12-31',
      quantityInStock: 800,
      unitOfMeasure: 'pack',
      reorderLevel: 100,
      storageLocation: 'Shelf C4',
      usageLogs: 'Gastric medication',
      purchasePrice: 1.2,
      sellingPrice: 2.5,
      type: 'medication',
      supplier: 'HealthPlus Pharma'
    },
    {
      id: 8,
      itemName: 'Blood Pressure Monitor',
      skuCode: 'SKU008',
      batchNumber: 'BATCH008',
      sku: 'SKU008',
      expiryDate: '2027-12-31',
      quantityInStock: 30,
      unitOfMeasure: 'pcs',
      reorderLevel: 5,
      storageLocation: 'Shelf D5',
      usageLogs: 'Medical equipment',
      purchasePrice: 25.0,
      sellingPrice: 45.0,
      type: 'consumer'
    }
  ];

  get filteredItems() {
    if (!this.searchQuery) return this.items;
    
    const query = this.searchQuery.toLowerCase();
    return this.items.filter(item => 
      item.itemName.toLowerCase().includes(query) ||
      item.skuCode.toLowerCase().includes(query) ||
      item.batchNumber.toLowerCase().includes(query)
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredItems.length / this.entriesPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.entriesPerPage;
    const end = start + this.entriesPerPage;
    return this.filteredItems.slice(start, end);
  }

  ngOnInit() {
    console.log('Inventory component initialized');
  }

  onSearch() {
    // Search functionality is handled by the filteredItems getter
  }

  openAddModal() {
    this.showAddModal = true;
    this.resetForm();
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  setActiveSection(section: 'consumer' | 'medication') {
    this.activeSection = section;
    this.newItem.type = section;
  }

  resetForm() {
    this.newItem = {
      type: this.activeSection
    };
  }

  submitForm() {
    console.log('Submitting form:', this.newItem);
    // TODO: Implement API call to save the item
    this.closeAddModal();
  }

  viewItem(item: InventoryItem) {
    this.selectedItem = item;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedItem = null;
  }

  editItem(item: InventoryItem) {
    console.log('Edit item:', item);
    // TODO: Implement edit functionality
  }

  deleteItem(item: InventoryItem) {
    console.log('Delete item:', item);
    // TODO: Implement delete functionality
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onEntriesPerPageChange() {
    this.currentPage = 1; // Reset to first page when changing entries per page
  }
} 