<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/Main.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="BETEZCafe.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="mainContentHolder" runat="server">
    <div id="slogan">
        <img src="/Content/images/slogan_background.jpg" alt="">
        <div id="words">
            <p style="font-size: 115pt;">
                It's not just coffee
            </p>
            <p style="font-size: 140pt;">
                It's Café
            </p>
        </div>
    </div>
    <div id="menu">
        <div class="menu-header">
            <img src="/Content/images/menu-header.png" alt="">
            <p>Menu</p>
            <img src="/Content/images/menu-header.png" alt="">
        </div>
        <!--products-->
        <div class="menu-content container clearfix">
        </div>
        <!--end products-->
        <!--xem session-->
        <p id='test'>
        </p>
    </div>
    <!--end menu-->

    <!--cart-->
    <div class="cart-container">
            <div class="cart">
                <div class="cart-products">
                </div>
                <!--end ordered products-->
                <div class="cart-button" onClick="cart.submit()">
                    <span>Thanh toán</span>🛒
                </div>
            </div>
        </div>
        <!--endcart-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="Scripts/main.js"></script>
</asp:Content>
