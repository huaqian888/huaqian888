package pojo;

public class ClothesCloset {
    private String wood;
    private String color;
    private Integer size;
    private Double price;
    private String placeOfOrigin;
    private Integer inventory;
    private String container;

    @Override
    public String toString() {
        return "Clothes_closet{" +
                "wood='" + wood + '\'' +
                ", color='" + color + '\'' +
                ", size=" + size +
                ", price=" + price +
                ", placeOfOrigin='" + placeOfOrigin + '\'' +
                ", inventory=" + inventory +
                ", container='" + container + '\'' +
                '}';
    }

    public String getWood() {
        return wood;
    }

    public void setWood(String wood) {
        this.wood = wood;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getPlaceOfOrigin() {
        return placeOfOrigin;
    }

    public void setPlaceOfOrigin(String placeOfOrigin) {
        this.placeOfOrigin = placeOfOrigin;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public String getContainer() {
        return container;
    }

    public void setContainer(String container) {
        this.container = container;
    }

    public ClothesCloset() {
    }

    public ClothesCloset(String wood, String color, Integer size, Double price, String placeOfOrigin, Integer inventory, String container) {
        this.wood = wood;
        this.color = color;
        this.size = size;
        this.price = price;
        this.placeOfOrigin = placeOfOrigin;
        this.inventory = inventory;
        this.container = container;
    }
}
